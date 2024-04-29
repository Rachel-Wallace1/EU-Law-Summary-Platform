
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(); // creates context

export const useAuth = () => useContext(AuthContext); // method that any component can use to access isLoggedIn, user context

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // local state for logged in
    const [user, setUser] = useState({  // local state for user
        email: localStorage.getItem('email') || null, // fetches values after login from browser storage
        first_name: localStorage.getItem('first_name') || null,  // fetches values after login from browser storage
        last_name: localStorage.getItem('last_name') || null, // fetches values after login from browser storage
        role: localStorage.getItem('role') || null, // fetches values after login from browser storage
        username: localStorage.getItem('username') || null // fetches values after login from browser storage
    });

    // determines if user is logged in based on an access token existing in the browser storage
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsLoggedIn(!!token);
    }, []);

    // returns context provider to give access to all isLoggedIn, user to children components
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
