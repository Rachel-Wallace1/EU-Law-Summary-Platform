import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function LogOut() {
    let navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    const handleLogout = () => {
        // Clear the stored token
        localStorage.removeItem('access_token');

        // update AuthContext state
        setIsLoggedIn(false);
        
        // Redirect to home page
        navigate('/');
    };

    return (
        <button onClick={handleLogout} className="nav-link">Sign Out</button>
    );
}

export default LogOut;
