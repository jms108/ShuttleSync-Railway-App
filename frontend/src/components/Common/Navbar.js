import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/dashboard">ShuttleSync</Link>
            </div>
            <div className="navbar-links">
                {user && (
                    <>
                        <span className="welcome">Welcome, {user.name}</span>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/search">Search Trains</Link>
                        <Link to="/bookings">My Bookings</Link>
                        <Link to="/notice">Notice</Link>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;