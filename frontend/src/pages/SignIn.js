import React, { useState } from 'react';
import './SignIn.css';
import PageHeaderComponent from '../components/PageHeaderComponent';

function SignIn() {
const [formData, setFormData] = useState({
    email: '',
    password: '',
});

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/signin/', { // update url for prod
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password,
        }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log('Success:', data);

        // save the access and refresh tokens in local storage
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        // Redirect the user to the summaries page upon successful sign-in
        window.location.href = '/summaries';
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error signing in. Please try again.');  // Show an error message
    });
};


return (
    <>
    <PageHeaderComponent title="Sign In" />
    <form onSubmit={handleSubmit}>
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
    <button type="submit">Sign In</button>
    </form>
    </>
);
}

export default SignIn;
