import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (token && user) {
            setIsAuthenticated(true);
            if (location.pathname === '/' || 
                location.pathname === '/login' || 
                location.pathname === '/signup') {
                navigate('/dashboard', { replace: true });
            }
        } else {
            setIsAuthenticated(false);
            if (location.pathname !== '/login' && location.pathname !== '/signup') {
                navigate('/login', { replace: true });
            }
        }
    }, [location, navigate, setIsAuthenticated]);

    return null;
}

export default RefreshHandler;