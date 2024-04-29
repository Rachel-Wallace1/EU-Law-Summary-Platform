import React, {useState} from 'react';
import {Modal, Button, Form, Alert} from 'react-bootstrap';
import {useCSRFToken} from "./CSRFTokenContext";
import {roles, UserRoleStringToIntMapping} from "./enums";

// EditUserModalComponent is a modal to edit the user that calls the backend to update the role
const EditUserModalComponent = ({show, onHide, user, setCurrentUser}) => {
    const {csrfToken} = useCSRFToken();
    const [selectedRole, setSelectedRole] = useState(user.role || roles[0]);

    // function to call backend and update role given a user id and role
    async function updateUserRole() {
        try {
            const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/updateRole/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify({
                    id: user.id,
                    role: UserRoleStringToIntMapping[selectedRole]
                })
            });

            setCurrentUser(null)
            if (!response.ok) {
                throw new Error('Failed to update user role');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // on "Save" click, update the user role in the backend and hide modal
    const handleSaveUser = async () => {
        await updateUserRole();
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Update {user.username}'s Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="userRoleSelect">
                        <Form.Label>Select User Role</Form.Label>
                        <Form.Select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            {/* displays a dropdown with possible roles values from enum.js */}
                            {roles.map((role, index) => (
                                <option key={index} value={role}>
                                    {role}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={handleSaveUser}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUserModalComponent;
