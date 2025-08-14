import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../../utils/api';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        
        if (!name || !email || !password) {
            return toast.error('All fields are required');
        }

        setLoading(true);
        try {
            const response = await registerUser({ name, email, password });
            if (response.success) {
                toast.success('Registration successful. Please login.');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                toast.error(response.message || 'Registration failed');
            }
        } catch (err) {
            toast.error(err.message || 'An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='auth-container'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                        required
                    />
                </div>
                <button type='submit' disabled={loading}>
                    {loading ? 'Registering...' : 'Sign Up'}
                </button>
                <div className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;