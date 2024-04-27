import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import {SummaryStatus} from "./enums";

const RequestRevisionModal = ({ document,currentUser, show, onHide }) => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [notes, setNotes] = useState('');

    async function updateSummaryStatus() {
        try {
            const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    celexNumber: document.celexNumber,
                    author: currentUser,
                    status: SummaryStatus.REVISED,
                    summary: document.current.summary,
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update summary status');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function addNote() {
        try {
            const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/editNote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    celexNumber: document.celexNumber,
                    note: notes,
                    version: document.current.v + 1,
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add note');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleRequestRevision = async (e) => {
        await addNote();
        await updateSummaryStatus();
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