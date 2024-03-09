import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <Navbar className="bg-body-tertiary" expand="lg" sticky="top"
                style={{ paddingLeft: '30px', paddingRight: '30px' }}>
            <Navbar.Brand href="/"><strong>EU Law</strong></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Add aria-controls */}
            <Navbar.Collapse id="basic-navbar-nav"> {/* Add this wrapper */}
                <Nav className="ms-auto">
                    <Nav.Link as="div">
                        <Link to="/signup" className="nav-link">Sign Up</Link> {/* Adjust the className */}
                    </Nav.Link>
                    <Nav.Link as="div">
                        <Link to="/signin" className="nav-link">Sign In</Link> {/* Adjust the className */}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse> {/* Close the wrapper */}
        </Navbar>
    );
}

export default NavBar;
