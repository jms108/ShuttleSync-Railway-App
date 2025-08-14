// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { initPayment, validatePayment } from '../../utils/api';

// function Payment() {
//     const { bookingId } = useParams();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [paymentUrl, setPaymentUrl] = useState('');
//     const [paymentStatus, setPaymentStatus] = useState('pending');
    
//     useEffect(() => {
//         const initPaymentProcess = async () => {
//             setLoading(true);
//             try {
//                 const response = await initPayment({ bookingId });
//                 if (response.success) {
//                     setPaymentUrl(response.data);
//                     window.open(response.data, '_self');
//                 } else {
//                     toast.error(response.message || 'Payment initialization failed');
//                     navigate(`/bookings`);
//                 }
//             } catch (err) {
//                 toast.error('An error occurred during payment initialization');
//                 navigate(`/bookings`);
//             } finally {
//                 setLoading(false);
//             }
//         };
        
//         initPaymentProcess();
//     }, [bookingId, navigate]);

//     // Handle payment validation after returning from SSLCommerz
//     useEffect(() => {
//         const queryParams = new URLSearchParams(window.location.search);
//         const val_id = queryParams.get('val_id');
        
//         if (val_id && !paymentUrl) {
//             const validatePaymentProcess = async () => {
//                 setLoading(true);
//                 try {
//                     const response = await validatePayment(bookingId, { val_id });
//                     if (response.success) {
//                         toast.success('Payment successful! Booking confirmed.');
//                         setPaymentStatus('completed');
//                     } else {
//                         toast.error(response.message || 'Payment validation failed');
//                         setPaymentStatus('failed');
//                     }
//                 } catch (err) {
//                     toast.error('An error occurred during payment validation');
//                     setPaymentStatus('failed');
//                 } finally {
//                     setLoading(false);
//                     navigate('/bookings');
//                 }
//             };
            
//             validatePaymentProcess();
//         }
//     }, [bookingId, navigate, paymentUrl]);

//     if (loading) {
//         return <div>Processing payment...</div>;
//     }

//     return (
//         <div className="payment-container">
//             {paymentStatus === 'pending' && !paymentUrl && (
//                 <div>Preparing payment gateway...</div>
//             )}
//             {paymentStatus === 'completed' && (
//                 <div className="payment-success">
//                     <h2>Payment Successful!</h2>
//                     <p>Your booking has been confirmed.</p>
//                     <button onClick={() => navigate('/bookings')}>View Bookings</button>
//                 </div>
//             )}
//             {paymentStatus === 'failed' && (
//                 <div className="payment-failed">
//                     <h2>Payment Failed</h2>
//                     <p>Please try again or contact support.</p>
//                     <button onClick={() => navigate(`/bookings`)}>Try Again</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Payment;









import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { initPayment } from '../../utils/api';

function Payment() {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState('');
    
    useEffect(() => {
        const initPaymentProcess = async () => {
            setLoading(true);
            try {
                const response = await initPayment({ bookingId });
                if (response.success) {
                    setPaymentUrl(response.data);
                    // Redirect to SSLCommerz payment page
                    window.location.href = response.data;
                } else {
                    toast.error(response.message || 'Payment initialization failed');
                    navigate('/bookings');
                }
            } catch (err) {
                toast.error('An error occurred during payment initialization');
                console.error(err);
                navigate('/bookings');
            } finally {
                setLoading(false);
            }
        };
        
        initPaymentProcess();
    }, [bookingId, navigate]);

    if (loading) {
        return (
            <div className="payment-container">
                <div className="payment-processing">
                    <h2>Processing Payment...</h2>
                    <p>Redirecting to payment gateway, please wait.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-container">
            <div className="payment-initializing">
                <h2>Preparing Payment Gateway</h2>
                <p>Please wait while we connect to the payment service.</p>
            </div>
        </div>
    );
}

export default Payment;