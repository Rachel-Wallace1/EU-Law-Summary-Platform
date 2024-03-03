import React, { useState } from 'react';

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
    fetch('http://localhost:8000/signin/', { // Update to django URL later, or load as an environment variable
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Store the logged-in user's token or session info if applicable
        // Redirect user or show success message
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};


return (
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
);
}

export default SignIn;
