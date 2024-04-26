import React, { createContext, useState, useContext, useEffect } from 'react';

const CSRFTokenContext = createContext();

export const CSRFTokenProvider = ({ children }) => {
    const [csrfToken, setCSRFToken] = useState('');

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
                setCSRFToken(data.csrfToken);
            } catch (error) {
                console.error("Could not fetch CSRF token", error);
            }
        };

        fetchCSRFToken();
    }, []);

    return (
        <CSRFTokenContext.Provider value={{ csrfToken, setCSRFToken }}>
            {children}
        </CSRFTokenContext.Provider>
    );
};

export const useCSRFToken = () => useContext(CSRFTokenContext);
