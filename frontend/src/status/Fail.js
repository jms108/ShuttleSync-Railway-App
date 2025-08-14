import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Fail = () => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const tranId = params.get('tran_id');
        const errorType = params.get('error');

        if (tranId) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/payments/payment/${tranId}`
          );
          
          if (response.data) {
            setPayment(response.data);
          }
        }

        const errorMessages = {
          validation: 'Payment verification failed with SSLCommerz',
          processing: 'Error processing your payment',
          declined: 'Payment was declined by your bank',
          timeout: 'Payment session timed out',
          default: 'Payment was not completed successfully'
        };

        setError(errorMessages[errorType] || errorMessages.default);
      } catch (err) {
        console.error('Error fetching payment details:', err);
        setError('Failed to retrieve payment details. Please check your booking history.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [location]);

  const handleRetry = () => {
    if (payment?.booking) {
      navigate(`/book/${payment.booking.train}`);
    } else {
      navigate('/search');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Processing payment status...</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#f44336', textAlign: 'center' }}>Payment Failed</h1>
      
      <div style={{ 
        backgroundColor: '#ffebee',
        padding: '1rem',
        borderRadius: '4px',
        margin: '1rem 0',
        textAlign: 'center'
      }}>
        <p style={{ color: '#f44336', fontWeight: 'bold', margin: 0 }}>
          {error}
        </p>
      </div>

      {payment && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ textAlign: 'center' }}>Transaction Details</h3>
          <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Transaction ID:</td>
                <td style={{ padding: '0.5rem' }}>{payment.transactionId}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Amount:</td>
                <td style={{ padding: '0.5rem' }}>{payment.amount} BDT</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Status:</td>
                <td style={{ padding: '0.5rem', color: '#f44336' }}>{payment.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button 
          onClick={handleRetry}
          style={{
            padding: '0.8rem 1.5rem',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Try Again
        </button>
        
        <button 
          onClick={() => navigate('/bookings')}
          style={{
            padding: '0.8rem 1.5rem',
            backgroundColor: '#607d8b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          View Bookings
        </button>
      </div>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '4px',
        textAlign: 'center' 
      }}>
        <p style={{ margin: '0.5rem 0' }}>Need assistance with your payment?</p>
        <p style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>
          Contact support: support@railway.com | Phone: 123-456-7890
        </p>
      </div>
    </div>
  );
};

export default Fail;