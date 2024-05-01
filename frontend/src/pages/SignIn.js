import React, {useState} from 'react';
import './SignIn.css';
import PageHeaderComponent from '../components/PageHeaderComponent';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../components/AuthContext";

function SignIn() {
    const navigate = useNavigate(); // hook from react router dom to enable navigation
    const { setIsLoggedIn, setUser } = useAuth(); // get setIsLoggedIn and setUser from auth context
    const [formData, setFormData] = useState({ // local state for formData and setFormData
        email: '',
        password: '',
    });

    // onChange, set formData with input value
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // on form submit, call to backend /api/signin/ to sign the user
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
                // on success, store user data from backend in to browser storage
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                localStorage.setItem('first_name', data.user_data.first_name);
                localStorage.setItem('last_name', data.user_data.last_name);
                localStorage.setItem('role', data.user_data.role);
                localStorage.setItem('email', data.user_data.email);

                // update isLoggedIn with true, update user data, and navigate to /summaries page
                setIsLoggedIn(true);
                setUser(data.user_data)
                window.location.href = '/summaries'
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
                <form onSubmit={handleSubmit}> {/* onSubmit, call the backend to sign the user in */}
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