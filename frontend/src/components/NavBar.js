import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
return (
    <nav>
    <Link to="/">Home</Link> | <Link to="/signup">SignUp</Link> | <Link to="/signin">SignIn</Link>
    </nav>
);
}

export default NavBar;
