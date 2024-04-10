// HomePage.js
import React from 'react';
import './HomePage.css'; // Import the CSS for styling

const HomePage = () => {
    return (
        <div className="home-container">
            <h1>Welcome to EU Law App</h1>
            <p>This is a temp external-facing page for citizens. Please check back for published summaries below in a few days.</p>
            <p>{process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_MODE : process.env.REACT_APP_PRO_MODE}</p>
            {/* add more content here later. */}
        </div>
    );
};

export default HomePage;
