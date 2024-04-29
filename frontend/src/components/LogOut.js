import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// LogOut component logs the user out
function LogOut() {
    let navigate = useNavigate();
    const { setIsLoggedIn, setUser } = useAuth();

    const handleLogout = () => {
        // Clear the stored token
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        localStorage.removeItem('role');
        localStorage.removeItem('email');

        // update AuthContext state
        setIsLoggedIn(false);
        setUser({});
        
        // Redirect to home page
        navigate('/');
    };

    return (
        <button onClick={handleLogout} className="nav-link">Sign Out</button>
    );
}

export default LogOut;
