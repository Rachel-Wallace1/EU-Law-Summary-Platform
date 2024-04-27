import React, {useState} from 'react';
import './SignIn.css';
import PageHeaderComponent from '../components/PageHeaderComponent';
import {useNavigate} from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/signin/`, { // update url for prod
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
                navigate('/');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('There was an error signing in. Please try again.');  // Show an error message
            });
    };


    return (
        <>
            <div className="signin-container">
                <div id="signin-text">
                    <div id="left">
                        <p>Welcome to EU LAW</p>
                    </div>
                    <div id="right">
                        <p>No account?</p>
                        <a href="/signup">Sign Up</a>
                    </div>
                </div>
                <div id="heading">
                    <h1>Sign In</h1>
                </div>
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
            </div>
        </>
    );
}

export default SignIn;
