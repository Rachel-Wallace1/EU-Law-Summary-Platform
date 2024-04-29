import React from 'react';
import {Navbar, Nav, NavDropdown, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import LogOut from './LogOut';
import {useAuth} from './AuthContext';
import {roles, UserRole, UserRoleIntToStringMapping} from "./enums";

function NavBar() {
    const {isLoggedIn, user, setUser} = useAuth(); // gets the isLoggedIn and user from auth context
    const userRole = user.role ? UserRoleIntToStringMapping[user.role] : UserRole.NO_ROLE_ASSIGNED // maps the user role from context to a string

    return (
        <>
            <Navbar className="bg-body-tertiary" expand="lg" sticky="top"
                    style={{paddingLeft: '30px', paddingRight: '30px'}}>
                <Navbar.Brand href="/"><strong>EU Law</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* if user isLoggedIn and is a valid user then render elements below */}
                        {isLoggedIn && user ? (
                            <>
                                <Nav.Link as="div">
                                    <Link to="/summaries" className="nav-link">View Summaries</Link>
                                </Nav.Link>
                                {/* if user role is an EDITOR only show Generate Summaries and Settings Links */}
                                {userRole === UserRole.EDITOR && (
                                    <>
                                        <Nav.Link as="div">
                                            <Link to="/generate_new_summary" className="nav-link">Generate
                                                Summaries</Link>
                                        </Nav.Link>
                                        <Nav.Link as="div">
                                            <Link to="/settings" className="nav-link">Settings</Link>
                                        </Nav.Link>
                                    </>
                                )
                                }
                                {/* if user role is an MANAGER only show Manager View */}
                                {userRole === UserRole.MANAGER &&
                                    <Nav.Link as="div">
                                        <Link to="/manager" className="nav-link">Manager View</Link>
                                    </Nav.Link>
                                }
                                <Nav.Link as="div"> {/* if isLoggedIn show LogOut */}
                                    <LogOut/>
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                {/* if user is not logged in show View Summaries, Sign Up, and Sign In Links */}
                                <Nav.Link as="div">
                                    <Link to="/summaries" className="nav-link">View Summaries</Link>
                                </Nav.Link>
                                <Nav.Link as="div">
                                    <Link to="/signup" className="nav-link">Sign Up</Link>
                                </Nav.Link>
                                <Nav.Link as="div">
                                    <Link to="/signin" className="nav-link">Sign In</Link>
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default NavBar;