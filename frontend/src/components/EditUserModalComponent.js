import React, {useState} from 'react';
import {Modal, Button, Form, Alert} from 'react-bootstrap';
import {useCSRFToken} from "./CSRFTokenContext";
import {roles, UserRoleStringToIntMapping} from "./enums";

const EditUserModalComponent = ({show, onHide, user, setCurrentUser}) => {
    const {csrfToken} = useCSRFToken();
    const [selectedRole, setSelectedRole] = useState(user.role || roles[0]);

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

            console.log(user.id, selectedRole)

            setCurrentUser(null)
            if (!response.ok) {
                throw new Error('Failed to update user role');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

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
