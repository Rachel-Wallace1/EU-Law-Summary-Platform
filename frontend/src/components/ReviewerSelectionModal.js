import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import {SummaryStatus} from "./enums";
import {useCSRFToken} from "./CSRFTokenContext";

// ReviewerSelectionModal component which calls backend to update the document with status "Pending Approval" and author
const ReviewerSelectionModal = ({ show, onHide, user, document, updatedText }) => {
    const {csrfToken} = useCSRFToken()

    // call backend to update the document with status "Pending Approval" and author
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
                    author: (user.first_name + " " + user.last_name) || 'No name',
                    status: SummaryStatus.PENDING_APPROVAL,
                    summary: updatedText,
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update summary status');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    // on "Send for Review" click call updateSummaryStatus function and hide modal
    const handleSendForReview = async () => {
        await updateSummaryStatus()
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Send Document for Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to send for review?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={handleSendForReview}>Send for Review</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReviewerSelectionModal;
