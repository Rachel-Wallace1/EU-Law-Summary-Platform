import React, {useEffect} from 'react';
import {Card, Container, Row, Col, Button, Modal, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useAuth} from './AuthContext';
import PublishConfirmationModal from './PublishConfirmationModal';
import {SummaryStatus, UserRole, UserRoleIntToStringMapping} from "./enums";
import ReviewerSelectionModal from "./ReviewerSelectionModal";
import RequestRevisionModal from "./RequestRevisionModal";
import {useCSRFToken} from "./CSRFTokenContext";

// DeleteSummaryModal to display modal for deleting a summary
function DeleteSummaryModal({show, onHide, celex, deleteSummaryClick}) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Summary
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label htmlFor="celexId">Do you really want to delete this summary? This process cannot be
                    undone.</Form.Label>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteSummaryClick}>Yes, delete it</Button>
                </Modal.Footer>
            </Modal.Body>

        </Modal>


    );
}

// Utility function to sanitize and format string inputs
function sanitizeAndFormatString(str) {
    const escapedStr = str.replace(/[&<>"']/g, function (match) {
        switch (match) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case "'":
                return '&#39;';
        }
    });

    const formattedStr = escapedStr.replace(/\n/g, '<br>');

    return formattedStr;
}

function ViewDocumentComponent({celex, editedSummary}) {
    const navigate = useNavigate(); // hook from react router dom to enable navigation
    const {user} = useAuth(); // getting the user from the auth context
    const userRoleAsString = UserRoleIntToStringMapping[user.role]; // mapping user role to string
    const [modalShowDelete, setModalShowDelete] = React.useState(false); // getter and setter to display the delete modal
    const [currentSummary, setCurrentSummary] = React.useState(''); // getter and setter for the current summary
    const [document, setDocument] = React.useState({}); // getter and setter for document
    const [showReviewerModal, setShowReviewerModal] = React.useState(false); // getter and setter to show the reviewer modal
    const [showRequestRevisionModal, setShowRequestRevisionModal] = React.useState(false); // getter and setter to show request for revision modal
    const [showPublishConfirmModal, setShowPublishConfirmModal] = React.useState(false); // getter and setter to show published confirm modal
    const [formattedSummary, setFormattedSummary] = React.useState(); // getter and setter for the formatted summary

    // on edited summary OR document change effect runs
    // effect to handle changes to editedSummary or document, updating formatted and current summary
    useEffect(() => {
        if (editedSummary && editedSummary !== "") {
            setFormattedSummary(sanitizeAndFormatString(editedSummary))
            setCurrentSummary(editedSummary)
        } else if (document && document.current && document.current.summary) {
            setFormattedSummary(sanitizeAndFormatString(document.current.summary))
            setCurrentSummary(document.current.summary)
        }
    }, [editedSummary, document])

    // Onload call the backend to fetch the summary
    useEffect(() => {
        const fetchSummaryByCelex = async () => {
            try {
                const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/edit/${celex}`);
                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`);
                }
                const data = await response.json();
                setDocument(data);
            } catch (error) {
                console.error("Could not fetch summary by celex: ", error);
            }
        };

        fetchSummaryByCelex();
    }, [])

    // on edit click navigate to summary/edit/ endpoint and pass document data
    const handleEditClick = () => {
        navigate(`/summary/${document.celexNumber}/edit`, {state: {document}})
    }

    // on delete click call the backend delete endpoint with a celex number in the body
    const handleDeleteClick = async (e) => {

        try {
            const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    celexNumber: `${document.celexNumber}`,
                })
            });

            if (!response.ok) {
                throw new Error('Failed to delete summary');
            }

            // Navigate to the "/Summaries" page
            navigate(`/Summaries`);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleGenerateSummaryClick = () => {
        navigate(`/summary/${document.celexNumber}/new`, {state: {document}})
    }

    // on timeline click navigate to the summary/timeline
    const handleTimelineClick = () => {
        navigate(`/summary/${celex}/timeline`, {})
    }

    // on review click show reviewer modal
    const handleReviewClick = () => {
        setShowReviewerModal(true);
    };

    // on request for revision click show request revision modal
    const handleRequestForRevisionClick = () => {
        setShowRequestRevisionModal(!showRequestRevisionModal);
    };


    // on publish click show publish confirm modal
    const handlePublishClick = async () => {
        setShowPublishConfirmModal(true);
    }

    return (
        <Container>
            {/* Conditionally render the following block if the document is not published */}
            {document.status !== "Published" && <Container>
                {/* Row for action buttons with bottom margin */}
                <Row className="justify-content-between" style={{marginBottom: '5px'}}>
                    <Col xs="auto">
                        {/* Conditionally render the timeline button for certain user roles */}
                        {(userRoleAsString === UserRole.EDITOR || userRoleAsString === UserRole.LEGAL_EXPERT || userRoleAsString === UserRole.MANAGER) &&
                            <>
                                <Button variant="primary" onClick={handleTimelineClick}>Timeline</Button>
                            </>
                        }
                    </Col>
                    <Col xs="auto">
                        {/* Container for buttons with a gap */}
                        <div className="d-flex gap-2">
                            {/* Conditionally render the following buttons for editors */}
                            {userRoleAsString === UserRole.EDITOR &&
                                <>
                                    <Button variant="warning" onClick={handleEditClick}>Edit</Button>
                                    <Button variant="danger" onClick={() => setModalShowDelete(true)}>Delete</Button>
                                    {/* Modal for deleting a document summary */}
                                    <DeleteSummaryModal
                                        celex={celex}
                                        show={modalShowDelete}
                                        onHide={() => setModalShowDelete(false)}
                                        deleteSummaryClick={handleDeleteClick}
                                    />
                                    <Button variant="success" onClick={handleReviewClick}>Send For Review</Button>
                                    {/* Modal for selecting a reviewer */}
                                    <ReviewerSelectionModal
                                        show={showReviewerModal}
                                        onHide={() => setShowReviewerModal(false)}
                                        user={user}
                                        document={document}
                                        updatedText={currentSummary}
                                    />
                                </>
                            }
                            {/* Conditionally render the following buttons for legal experts */}
                            {userRoleAsString === UserRole.LEGAL_EXPERT &&
                                <>
                                    <Button variant="warning" onClick={handleRequestForRevisionClick}>Request for
                                        Revision</Button>
                                    {/* Modal for requesting a revision */}
                                    <RequestRevisionModal
                                        show={showRequestRevisionModal}
                                        onHide={handleRequestForRevisionClick}
                                        document={document}
                                    />
                                    <Button onClick={handlePublishClick}>Publish</Button>
                                    {/* Modal for confirming publication */}
                                    <PublishConfirmationModal
                                        show={showPublishConfirmModal}
                                        onHide={() => setShowPublishConfirmModal(false)}
                                        document={document}
                                        user={user}
                                        updatedText={currentSummary}
                                    />
                                </>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>}
            {/* Container for displaying document summary */}
            <Container fluid="md">
                <Row>
                    <Card>
                        <Card.Body>
                            {/* Card title centered with document's title */}
                            <Card.Title style={{textAlign: 'center'}}><strong>{document.title}</strong></Card.Title>
                            {/* Card text displaying formatted document summary */}
                            <Card.Text>
                                <div dangerouslySetInnerHTML={{__html: formattedSummary}}></div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </Container>
    );
}

export default ViewDocumentComponent;