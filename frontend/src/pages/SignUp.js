import React, { useState } from 'react';
import './SignUp.css';
import '../components/PageHeaderComponent';
import PageHeaderComponent from '../components/PageHeaderComponent';

function SignUp() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/signup/`, { // update to use your Django backend URL, or load as environment variable
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                password: formData.password            
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Redirect user or show success message
            // redirect to sign in page
            window.location.href = '/signin';
        })
        .catch((error) => {
            console.error('Error:', error);

            // Show error message to user
            alert('There was an error signing up. Please try again.');
        });
    };

    return (
        <>
        <PageHeaderComponent title="Sign Up" />
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm Password"
                value={formData.passwordConfirmation}
                onChange={handleChange}
                required
            />
            <button type="submit">Sign Up</button>
        </form>
        </>
    );
}

export default SignUp;
