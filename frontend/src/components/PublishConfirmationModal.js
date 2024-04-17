import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const PublishConfirmationModal = ({ show, onHide }) => {
    // Hardcoded data for demo purposes


    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const handlePublishClick = () => {
        // Placeholder for sending action
        console.log('publish clicked');
        setShowSuccessAlert(true);
        onHide(); // Close modal after sending
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Publish Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert show={showSuccessAlert} variant="success">
                    Document published successfully!
                </Alert>
                <p>Are you sure you want to publish this document? Once published, the document will be accessible by the general public.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={handlePublishClick}>Publish</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PublishConfirmationModal;
