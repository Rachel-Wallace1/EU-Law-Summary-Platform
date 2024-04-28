import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import {SummaryStatus} from "./enums";
import {useCSRFToken} from "./CSRFTokenContext";

const PublishConfirmationModal = ({ show, onHide, document, user, updatedText }) => {
    const {csrfToken} = useCSRFToken()

    async function updateSummaryStatus() {
        try {
            const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/update/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify({
                    celexNumber: document.celexNumber,
                    author: user.name,
                    status: SummaryStatus.PUBLISHED,
                    summary: updatedText,
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update summary');
            }

            onHide();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Publish Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to publish this document? Once published, the document will be accessible by the general public.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={updateSummaryStatus}>Publish</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PublishConfirmationModal;