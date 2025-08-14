import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validatePayment } from '../utils/api';

function PaymentSuccess() {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();


useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const val_id = queryParams.get('val_id');

    const handlePaymentResult = async () => {
        try {
            if (status === 'success' && val_id) {
                const response = await validatePayment(bookingId, { val_id });
                if (response.success) {
                    toast.success('Payment verified successfully!');
                    // Delay navigation slightly to show success message
                    setTimeout(() => navigate('/bookings'), 1500);
                    return;
                } else {
                    toast.error('Payment verification failed');
                }
            }
            else if (status === 'fail') {
                toast.error('Payment failed. Please try again.');
            }
            else if (status === 'cancel') {
                toast.warning('Payment was cancelled');
            }
            navigate('/bookings');
        } catch (err) {
            toast.error('Error processing payment');
            console.error(err);
            navigate('/bookings');
        }
    };

    handlePaymentResult();
}, [bookingId, navigate, location.search]);


    return (
        <div className="payment-verification">
            <h2>Processing your payment result...</h2>
            <p>Please wait while we verify your transaction.</p>
        </div>
    );
}

export default PaymentSuccess;