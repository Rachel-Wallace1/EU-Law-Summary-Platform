import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const CSRFTokenContext = createContext(); // creates context

export const useCSRFToken = () => useContext(CSRFTokenContext); // method that can be used by any component to get the token

// sets context up
export const CSRFTokenProvider = ({ children }) => {
    const [csrfToken, setCSRFToken] = useState(''); // local state for context

    // calls backend /api/csrf/ to get the csrfToken and updates the state using setCSRFToken
    useEffect(() => {
        const fetchCSRFToken = async () => {
            try {
                const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/csrf/`, {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCSRFToken(data.csrfToken); // state is updated
                Cookies.set('csrftoken', data.csrfToken, {expires: 1, path: '/'});
            } catch (error) {
                console.error("Could not fetch CSRF token", error);
            }
        };

        fetchCSRFToken(); // function we defined above is called here
    }, []);

    // returns the csrfToken context to be accessible by any children component
    return (
        <CSRFTokenContext.Provider value={{ csrfToken, setCSRFToken }}>
            {children}
        </CSRFTokenContext.Provider>
    );
};

