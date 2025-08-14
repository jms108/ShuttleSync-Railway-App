import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '../../utils/api';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        
        if (!email || !password) {
            return toast.error('Email and password are required');
        }

        setLoading(true);
        try {
            const response = await loginUser({ email, password });
            if (response.success) {
                toast.success('Login successful');
                localStorage.setItem('token', response.jwtToken);
                localStorage.setItem('user', JSON.stringify({
                    name: response.name,
                    email: response.email,
                    userId: response.userId
                }));
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else {
                toast.error(response.message || 'Login failed');
            }
        } catch (err) {
            toast.error(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='auth-container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
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
                        value={loginInfo.password}
                        required
                    />
                </div>
                <button type='submit' disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <div className="auth-footer">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;