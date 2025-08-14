const BookingModel = require('../models/Booking');
const TrainModel = require('../models/Train');

const createBooking = async (req, res) => {
    try {
        const { trainId, passengers, journeyDate } = req.body;
        const userId = req.user._id;

        // Validate train availability
        const train = await TrainModel.findById(trainId);
        if (!train || train.status !== 'active') {
            return res.status(400).json({
                success: false,
                message: "Train not available for booking"
            });
        }

        if (train.seatsAvailable < passengers.length) {
            return res.status(400).json({
                success: false,
                message: "Not enough seats available"
            });
        }

        // Calculate total fare
        const totalFare = train.fare * passengers.length;

        // Create booking
        const booking = new BookingModel({
            user: userId,
            train: trainId,
            passengers,
            journeyDate,
            totalFare,
            status: 'pending'
        });

        await booking.save();

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        const bookings = await BookingModel.find({ user: userId })
            .populate('train', 'name trainNumber from to departure arrival')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    createBooking,
    getBookings
};