import React from 'react';
import {Navbar, Nav, NavDropdown, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import LogOut from './LogOut';
import {useAuth} from './AuthContext';
import {roles, UserRole, UserRoleIntToStringMapping} from "./enums";

function NavBar() {
    const {isLoggedIn, user, setUser} = useAuth();
    const userRole = user.role ? UserRoleIntToStringMapping[user.role] : UserRole.NO_ROLE_ASSIGNED

    return (
        <>
            <Navbar className="bg-body-tertiary" expand="lg" sticky="top"
                    style={{paddingLeft: '30px', paddingRight: '30px'}}>
                <Navbar.Brand href="/"><strong>EU Law</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {isLoggedIn && user ? (
                            <>
                                <Nav.Link as="div">
                                    <Link to="/summaries" className="nav-link">View Summaries</Link>
                                </Nav.Link>
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
                                {userRole === UserRole.MANAGER &&
                                    <Nav.Link as="div">
                                        <Link to="/manager" className="nav-link">Manager View</Link>
                                    </Nav.Link>
                                }
                                <Nav.Link as="div">
                                    <LogOut/>
                                </Nav.Link>
                            </>
                        ) : (
                            <>
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