import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Success = () => {
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
        
        if (!tranId) {
          throw new Error('Transaction ID not found in URL');
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/payments/payment/${tranId}`
        );

        if (!response.data) {
          throw new Error('Payment details not found');
        }

        setPayment(response.data);
      } catch (err) {
        console.error('Payment verification failed:', err);
        setError(err.response?.data?.error || err.message || 'Failed to verify payment');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [location]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Processing your payment...</h2>
        <p>Please wait while we verify your transaction</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
        <h2>Payment Verification Failed</h2>
        <p>{error}</p>
        <p>Please check your booking history or contact support.</p>
        <button 
          onClick={() => navigate('/bookings')}
          style={{
            padding: '0.5rem 1rem',
            marginTop: '1rem',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          View Bookings
        </button>
      </div>
    );
  }

  if (!payment) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Payment Details Not Available</h2>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '0.5rem 1rem',
            marginTop: '1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#4CAF50', textAlign: 'center' }}>Payment Successful!</h1>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Payment Details</h3>
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
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Payment Method:</td>
              <td style={{ padding: '0.5rem' }}>{payment.method}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Status:</td>
              <td style={{ padding: '0.5rem', color: '#4CAF50' }}>{payment.status}</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>Date:</td>
              <td style={{ padding: '0.5rem' }}>
                {new Date(payment.createdAt).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button 
        onClick={() => navigate('/bookings')}
        style={{
          display: 'block',
          width: '100%',
          padding: '0.8rem',
          marginTop: '2rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        View Your Bookings
      </button>
    </div>
  );
};

export default Success;