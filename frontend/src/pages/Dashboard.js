import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="dashboard">
            <div className="dashboard-hero">
                <h1 className="dashboard-title">Welcome to ShuttleSync</h1>
                <p className="dashboard-subtitle"> Shuttle Journey Makes Easier </p>
            </div>

            {/* Added the image container */}
            <div className="dashboard-image-container">
                <img src="cu_shuttle.jpg" alt="Train at station, Chattogram University" />
            </div>

            <div className="dashboard-actions">
                <Link to="/search" className="action-card">
                    <h2> Search Trains</h2>
                    <p>Find and book your train tickets with ease. Search through available routes and choose your perfect journey.</p>
                </Link>
                <Link to="/bookings" className="action-card">
                    <h2> My Bookings</h2>
                    <p>View your booking history and manage your current reservations. Keep track of all your travel plans.</p>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;