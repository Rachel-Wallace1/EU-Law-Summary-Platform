import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const RequestRevisionModal = ({ show, onHide }) => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [notes, setNotes] = useState('');

    const handleRequestRevision = () => {
        console.log(notes);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Request for Revision</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="requestForRevision">
                        <Form.Label>Provide Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={10}
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            placeholder="Enter any specific details or feedback"
                        />
                    </Form.Group>
                </Form>
                {showSuccessAlert && (
                    <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                        Revision request sent successfully!
                    </Alert>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={handleRequestRevision}>Send</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RequestRevisionModal;