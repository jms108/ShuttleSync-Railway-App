import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import PrivateRoute from './components/Common/PrivateRoute';
import RefreshHandler from './components/Auth/RefreshHandler';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './pages/Dashboard';
import SearchTrains from './pages/SearchTrains';
import Notice from './pages/Notice';
import BookingForm from './components/Booking/BookingForm';
import BookingHistory from './components/Booking/BookingHistory';
import Payment from './components/Booking/Payment';
import PaymentSuccess from './components/PaymentSuccess';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/payment-success/:bookingId" element={<PaymentSuccess />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><SearchTrains /></PrivateRoute>} />
          <Route path="/notice" element={<PrivateRoute><Notice /></PrivateRoute>} />
          <Route path="/book/:trainId" element={<PrivateRoute><BookingForm /></PrivateRoute>} />
          <Route path="/bookings" element={<PrivateRoute><BookingHistory /></PrivateRoute>} />
          <Route path="/payment/:bookingId" element={<PrivateRoute><Payment /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;