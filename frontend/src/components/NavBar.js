import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function NavBar() {
    return (
        <Navbar className="bg-body-tertiary" expand="lg" sticky="top"
                style={{paddingLeft: '30px', paddingRight: '30px'}}>
            <Navbar.Brand href="#home"><strong>EU Law</strong></Navbar.Brand>
            <Navbar.Toggle/>
            <Nav className="ms-auto">
                <Nav.Link as="div">
                    <Link to="/signup">Sign Up</Link>
                </Nav.Link>
                <Nav.Link as="div">
                    <Link to="/signin">Sign In</Link>
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default NavBar;