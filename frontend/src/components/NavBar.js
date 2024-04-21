import React from 'react';
import {Navbar, Nav, NavDropdown, Alert} from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';
import LogOut from './LogOut';
import {useAuth} from './AuthContext';
import {roles} from "./enums";

function NavBar() {
    const {isLoggedIn, user, setUser} = useAuth();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isTesting = queryParams.get('test') === 'true';

    const handleRoleChange = (newRole) => {
        setUser({...user, role: newRole});
    };

    return (
        <>
            {isTesting && (
                <Alert variant="warning" className="text-center">
                    You are currently in test mode
                </Alert>
            )}
            <Navbar className="bg-body-tertiary" expand="lg" sticky="top"
                    style={{paddingLeft: '30px', paddingRight: '30px'}}>
                <Navbar.Brand href="/"><strong>EU Law</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/> {/* Add aria-controls */}
                <Navbar.Collapse id="basic-navbar-nav"> {/* Add this wrapper */}
                    <Nav className="ms-auto">
                        {isLoggedIn ? (
                            // if logged in, show the logout button
                            <Nav.Link as="div">
                                <LogOut/>
                            </Nav.Link>
                        ) : (
                            // if not logged in, show the sign up and sign in links
                            <>
                                <Nav.Link as="div">
                                    <Link to="/Summaries" className="nav-link">View
                                        Summaries</Link> {/* Adjust the className */}
                                </Nav.Link>
                                <Nav.Link as="div">
                                    <Link to="/generate_new_summary" className="nav-link">Generate
                                        Summaries</Link> {/* Adjust the className */}
                                </Nav.Link>
                                <Nav.Link as="div">
                                    <Link to="/signup" className="nav-link">Sign Up</Link> {/* Adjust the className */}
                                </Nav.Link>
                                <Nav.Link as="div">
                                    <Link to="/signin" className="nav-link">Sign In</Link> {/* Adjust the className */}
                                </Nav.Link>
                                {isTesting && (
                                    <NavDropdown className="nav-link" title={user.role} id="navbarScrollingDropdown">
                                        {roles.map(role => (
                                            <NavDropdown.Item key={role} onClick={() => handleRoleChange(role)}>
                                                {role}
                                            </NavDropdown.Item>
                                        ))}
                                    </NavDropdown>
                                )}
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse> {/* Close the wrapper */}
            </Navbar>
        </>
    );
}

export default NavBar;