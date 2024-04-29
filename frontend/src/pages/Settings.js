import React, {useState} from 'react';
import './SignIn.css';
import { UserRoleIntToStringMapping } from "../components/enums.js"; //frontend/src/components/enums.js
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
            <div className="signin-container" >

                <div className="center-content" >
                    <h2>Account Info</h2>
                </div>
                <div className="center-content">
                    <h1><FaUserGraduate /></h1>
                </div>
                <div>
                <p></p>
                <p className="App">Name: {userProfile.first_name} {userProfile.last_name}</p>
                <p className="App">Role: { UserRoleIntToStringMapping[userProfile.role] }</p>
                <p className="App">Email: {userProfile.email}</p>
                </div>
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
