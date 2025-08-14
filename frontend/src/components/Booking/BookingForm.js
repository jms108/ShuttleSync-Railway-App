import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTrainDetails, createBooking } from '../../utils/api';

function BookingForm() {
    const { trainId } = useParams();
    const navigate = useNavigate();
    const [train, setTrain] = useState(null);
    const [loading, setLoading] = useState(false);
    const [passengers, setPassengers] = useState([{ name: '', age: '', gender: 'male' }]);
    const [journeyDate, setJourneyDate] = useState('');
    
    useEffect(() => {
        const fetchTrainDetails = async () => {
            try {
                const response = await getTrainDetails(trainId);
                if (response.success) {
                    setTrain(response.data);
                } else {
                    toast.error(response.message || 'Failed to fetch train details');
                    navigate('/search');
                }
            } catch (err) {
                toast.error('An error occurred while fetching train details');
                navigate('/search');
            }
        };
        
        fetchTrainDetails();
    }, [trainId, navigate]);

    const handlePassengerChange = (index, field, value) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index][field] = value;
        setPassengers(updatedPassengers);
    };

    const addPassenger = () => {
        if (passengers.length < 5) {
            setPassengers([...passengers, { name: '', age: '', gender: 'male' }]);
        }
    };

    const removePassenger = (index) => {
        if (passengers.length > 1) {
            const updatedPassengers = [...passengers];
            updatedPassengers.splice(index, 1);
            setPassengers(updatedPassengers);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!journeyDate) {
            return toast.error('Please select a journey date');
        }
        
        for (const passenger of passengers) {
            if (!passenger.name || !passenger.age) {
                return toast.error('Please fill all passenger details');
            }
        }

        setLoading(true);
        try {
            const response = await createBooking({
                trainId,
                passengers,
                journeyDate
            });
            
            if (response.success) {
                toast.success('Booking created successfully');
                navigate(`/payment/${response.data._id}`);
            } else {
                toast.error(response.message || 'Booking failed');
            }
        } catch (err) {
            toast.error('An error occurred during booking');
        } finally {
            setLoading(false);
        }
    };

    if (!train) {
        return <div>Loading train details...</div>;
    }

    return (
        <div className="booking-container">
            <h2>Book Tickets for {train.name} ({train.trainNumber})</h2>
            <div className="train-details">
                <p><strong>Train:</strong> {train.name} ({train.trainNumber}) - {train.class}</p>
                <p><strong>Route:</strong> {train.from} to {train.to}</p>
                <p><strong>Departure:</strong> {train.departure}</p>
                <p><strong>Arrival:</strong> {train.arrival}</p>
                <p><strong>Available Seats:</strong> {train.seatsAvailable}</p>
                <p><strong>Fare per passenger:</strong> ৳{train.fare}</p>
                <p><strong>Total Fare:</strong> ৳{train.fare * passengers.length}</p>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Journey Date</label>
                    <input
                        type="date"
                        value={journeyDate}
                        onChange={(e) => setJourneyDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                    />
                </div>
                
                <h3>Passenger Details</h3>
                {passengers.map((passenger, index) => (
                    <div key={index} className="passenger-details">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={passenger.name}
                                onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <input
                                type="number"
                                value={passenger.age}
                                onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                                min="1"
                                max="120"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select
                                value={passenger.gender}
                                onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        {passengers.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removePassenger(index)}
                                className="remove-btn"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                
                {passengers.length < 5 && (
                    <button
                        type="button"
                        onClick={addPassenger}
                        className="add-btn"
                    >
                        Add Passenger
                    </button>
                )}
                
                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
            </form>
        </div>
    );
}

export default BookingForm;