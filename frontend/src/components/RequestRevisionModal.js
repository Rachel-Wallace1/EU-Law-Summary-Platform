import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import {SummaryStatus} from "./enums";
import {useCSRFToken} from "./CSRFTokenContext";

// RequestRevisionModal component which calls the backend to save the document with status "Revised" and a Legal Expert note
const RequestRevisionModal = ({ document, show, onHide }) => {
    const {csrfToken} = useCSRFToken(); // get csrfToken from context
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [notes, setNotes] = useState('');

    // function call backend to store document with a note and "Revised" status
    async function addNote() {
        try {
            const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/editNote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify({
                    celexNumber: document.celexNumber,
                    note: notes,
                    status: SummaryStatus.REVISED
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add note');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    // on request revision "Send" click, call backend and hide modal
    const handleRequestRevision = async (e) => {
        await addNote();
        onHide();
    }

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