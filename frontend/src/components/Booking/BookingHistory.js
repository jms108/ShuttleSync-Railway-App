import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getBookings } from '../../utils/api';

function BookingHistory() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookings();
                if (response.success) {
                    // Filter out any bookings with null train data
                    const validBookings = response.data.filter(booking => 
                        booking && booking.train && booking.train.name
                    );
                    setBookings(validBookings);
                    
                    if (validBookings.length === 0) {
                        toast.info('No bookings found');
                    }
                } else {
                    toast.error(response.message || 'Failed to fetch bookings');
                }
            } catch (err) {
                toast.error('An error occurred while fetching bookings');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchBookings();
    }, []);

    if (loading) {
        return <div>Loading bookings...</div>;
    }

    if (bookings.length === 0) {
        return <div>No bookings found</div>;
    }

    return (
        <div className="booking-history">
            <h2>My Bookings</h2>
            <div className="bookings-list">
                {bookings.map(booking => (
                    <div key={booking._id} className="booking-card">
                        <h3>{booking.train?.name} ({booking.train?.trainNumber})</h3>
                        <p><strong>Route:</strong> {booking.train?.from} to {booking.train?.to}</p>
                        <p><strong>Journey Date:</strong> {new Date(booking.journeyDate).toLocaleDateString()}</p>
                        <p><strong>Passengers:</strong> {booking.passengers?.length || 0}</p>
                        <p><strong>Total Fare:</strong> ৳{booking.totalFare}</p>
                        <p><strong>Status:</strong> {booking.status}</p>
                        <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookingHistory;