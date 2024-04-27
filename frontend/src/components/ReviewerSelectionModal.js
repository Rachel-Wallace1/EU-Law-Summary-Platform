import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const ReviewerSelectionModal = ({ show, onHide }) => {
    // Hardcoded data for demo purposes
    const reviewers = [
        { id: 1, name: 'David Smith - Legal Expert' },
        { id: 2, name: 'Bob Johnson - Legal Expert' },
        { id: 3, name: 'Carol Davis - Curator' }
    ];

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const handleSendForReview = () => {
        // Placeholder for sending action
        console.log('Reviewer selected and document sent for review');
        setShowSuccessAlert(true);
        onHide(); // Close modal after sending
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Send Document for Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="reviewerSelection">
                        <Form.Label>Select Reviewer</Form.Label>
                        <Form.Control as="select">
                            {reviewers.map(reviewer => (
                                <option key={reviewer.id} value={reviewer.id}>
                                    {reviewer.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={handleSendForReview}>Send for Review</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReviewerSelectionModal;
