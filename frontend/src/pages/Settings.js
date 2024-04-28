import React, {useState} from 'react';
import './SignIn.css';

import {
    FaUserGraduate
} from "react-icons/fa"

function Settings() {

    const userProfile = {
        role: localStorage.getItem('role'),
        last_name: localStorage.getItem('last_name'),
        first_name: localStorage.getItem('first_name'),
        email: localStorage.getItem('email'),
    };
    const [openaiKey, setOpenaiKey] = useState(localStorage.getItem('openai_key') || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        localStorage.setItem('openai_key', openaiKey);
    };

    return (
        <>
            <div className="signin-container">

                <div className="center-content" >
                    <h2>Account Info</h2>
                </div>
                <div className="center-content">
                    <h1><FaUserGraduate /></h1>
                </div>
                <p>First Name: {userProfile.first_name}</p>
                <p>Last Name: {userProfile.last_name}</p>
                <p>Email: {userProfile.email}</p>
                    
                <form onSubmit={handleSubmit}>
                    <label htmlFor="openaiKey">OpenAI Key:</label>
                    <input
                        type="password"
                        id="openaiKey"
                        name="openaiKey"
                        value={openaiKey}
                        onChange={(e) => setOpenaiKey(e.target.value)}
                        required
                    />
                    <button type="submit">Save</button>
                </form>
            </div>
        </>
    );
}

export default Settings;
