const PaymentModel = require('../models/Payment');
const BookingModel = require('../models/Booking');
const TrainModel = require('../models/Train'); 
const sslCommerz = require('../utils/sslCommerz');

const initPayment = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const userId = req.user._id;

        // Validate booking
        const booking = await BookingModel.findOne({
            _id: bookingId,
            user: userId,
            status: 'pending',
            paymentStatus: 'pending'
        }).populate('train', 'name fare');

        if (!booking) {
            return res.status(400).json({
                success: false,
                message: "Invalid booking or already processed"
            });
        }

        // Prepare payment data for SSLCommerz
        const paymentData = {
            total_amount: booking.totalFare,
            currency: 'BDT',
            tran_id: `TRAIN_${booking._id}_${Date.now()}`,
            success_url:  `${process.env.BACKEND_URL}/payments/validate/${booking._id}?val_id={val_id}&status=success`,
            fail_url: `${process.env.BACKEND_URL}/payments/validate/${booking._id}`,
            cancel_url: `${process.env.BACKEND_URL}/payments/validate/${booking._id}`,
            emi_option: 0, // Disable EMI
            shipping_method: 'NO',
            product_name: `Train Ticket - ${booking.train.name}`,
            product_category: 'Ticket',
            product_profile: 'general',
            cus_name: req.user.name,
            cus_email: req.user.email || 'customer@example.com', // Ensure email exist
            cus_add1: 'N/A',
            cus_city: 'N/A',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: req.user.phone || '01700000000', // Ensure phone exists
            multi_card_name: 'mastercard,visa,amex',
            value_a: userId.toString(),
            value_b: booking._id.toString()
        };

        // Initiate payment with SSLCommerz
        const paymentResponse = await sslCommerz.init(paymentData);

        // Create payment record
        const payment = new PaymentModel({
            booking: booking._id,
            amount: booking.totalFare,
            transactionId: paymentData.tran_id,
            method: 'sslcommerz',
            status: 'pending'
        });

        await payment.save();

        res.status(200).json({
            success: true,
            data: paymentResponse.GatewayPageURL
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



const validatePayment = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const val_id = req.body.val_id || req.query.val_id;
        const status = req.body.status || req.query.status;

        if (!val_id) {
            return res.status(400).json({
                success: false,
                message: "val_id is required"
            });
        }

        // Skip validation in development
        if (process.env.NODE_ENV !== 'development') {
            const validationResponse = await sslCommerz.validate({ val_id });
            if (validationResponse.status !== 'VALID') {
                return res.status(400).json({
                    success: false,
                    message: "SSLCommerz validation failed"
                });
            }
        }

        // Update payment record
        const payment = await PaymentModel.findOneAndUpdate(
            { transactionId: req.body.tran_id || "SANDBOX_TEST_ID" },
            { status: 'success', paymentDetails: req.body },
            { new: true }
        );

        // Update booking
        const booking = await BookingModel.findByIdAndUpdate(
            bookingId,
            { status: 'confirmed', paymentStatus: 'completed' },
            { new: true }
        ).populate('train');

        // Update train seats if in production
        if (process.env.NODE_ENV !== 'development' && booking?.train?._id) {
            await TrainModel.findByIdAndUpdate(
                booking.train._id,
                { $inc: { seatsAvailable: -booking.passengers.length } }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Payment validated successfully"
        });

    } catch (err) {
        console.error("Payment validation error:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


module.exports = {
    initPayment,
    validatePayment
};