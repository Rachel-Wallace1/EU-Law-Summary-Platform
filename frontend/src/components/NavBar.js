import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogOut from './LogOut';
import { useAuth } from './AuthContext';

function NavBar() {

    // check if the user is logged in
    const { isLoggedIn } = useAuth();

    return (
        <Navbar className="bg-body-tertiary" expand="lg" sticky="top"
                style={{ paddingLeft: '30px', paddingRight: '30px' }}>
            <Navbar.Brand href="/"><strong>EU Law</strong></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Add aria-controls */}
            <Navbar.Collapse id="basic-navbar-nav"> {/* Add this wrapper */}
                <Nav className="ms-auto">
                    {isLoggedIn ? (
                        // if logged in, show the logout button
                        <Nav.Link as="div">
                            <LogOut />
                        </Nav.Link>
                    ) : (
                        // if not logged in, show the sign up and sign in links
                        <>
                            <Nav.Link as="div">
                                <Link to="/ui/Summaries" className="nav-link">View Summaries</Link> {/* Adjust the className */}
                            </Nav.Link>
                            <Nav.Link as="div">
                                <Link to="/ui/generate_new_summary" className="nav-link">Generate Summaries</Link> {/* Adjust the className */}
                            </Nav.Link>
                            <Nav.Link as="div">
                                <Link to="/ui/signup" className="nav-link">Sign Up</Link> {/* Adjust the className */}
                            </Nav.Link>
                            <Nav.Link as="div">
                                <Link to="/ui/signin" className="nav-link">Sign In</Link> {/* Adjust the className */}
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse> {/* Close the wrapper */}
        </Navbar>
    );
}

export default NavBar;