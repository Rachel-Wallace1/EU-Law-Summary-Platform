import React, {useEffect} from 'react';
import {Card, Container, Row, Col, Button, Modal, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useAuth} from './AuthContext';
import PublishConfirmationModal from './PublishConfirmationModal';
import {SummaryStatus, UserRole, UserRoleIntToStringMapping} from "./enums";
import ReviewerSelectionModal from "./ReviewerSelectionModal";
import RequestRevisionModal from "./RequestRevisionModal";
import {useCSRFToken} from "./CSRFTokenContext";

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
    const navigate = useNavigate();
    const {user} = useAuth();
    const userRoleAsString = UserRoleIntToStringMapping[user.role];
    const [modalShowDelete, setModalShowDelete] = React.useState(false);
    const [currentSummary, setCurrentSummary] = React.useState('');
    const [document, setDocument] = React.useState({});
    const [showReviewerModal, setShowReviewerModal] = React.useState(false);
    const [showRequestRevisionModal, setShowRequestRevisionModal] = React.useState(false);
    const [showPublishConfirmModal, setShowPublishConfirmModal] = React.useState(false);
    const [formattedSummary, setFormattedSummary] = React.useState();

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

    const handleEditClick = () => {
        navigate(`/summary/${document.celexNumber}/edit`, {state: {document}})
    }
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

    const handleTimelineClick = () => {
        navigate(`/summary/${celex}/timeline`, {})
    }

    const handleReviewClick = () => {
        setShowReviewerModal(true);
    };

    const handleRequestForRevisionClick = () => {
        setShowRequestRevisionModal(!showRequestRevisionModal);
    };


    const handlePublishClick = async () => {
        setShowPublishConfirmModal(true);
    }

    return (
        <Container>
            {document.status !== "Published" && <Container>
                <Row className="justify-content-between" style={{marginBottom: '5px'}}>
                    <Col xs="auto">
                        {(userRoleAsString === UserRole.EDITOR || userRoleAsString === UserRole.LEGAL_EXPERT || userRoleAsString === UserRole.MANAGER) &&
                            <>
                                <Button variant="primary" onClick={handleTimelineClick}>Timeline</Button>
                            </>
                        }
                    </Col>
                    <Col xs="auto">
                        <div className="d-flex gap-2">
                            {userRoleAsString === UserRole.EDITOR &&
                                <>
                                    <Button variant="warning" onClick={handleEditClick}>Edit</Button>
                                    <Button variant="danger" onClick={() => setModalShowDelete(true)}>Delete</Button>
                                    <DeleteSummaryModal
                                        celex={celex}
                                        show={modalShowDelete}
                                        onHide={() => setModalShowDelete(false)}
                                        deleteSummaryClick={handleDeleteClick}
                                    />
                                    <Button variant="success" onClick={handleReviewClick}>Send For Review</Button>
                                    <ReviewerSelectionModal
                                        show={showReviewerModal}
                                        onHide={() => setShowReviewerModal(false)}
                                        user={user}
                                        document={document}
                                        updatedText={currentSummary}
                                    />
                                </>
                            }
                            {userRoleAsString === UserRole.LEGAL_EXPERT &&
                                <>
                                    <Button variant="warning" onClick={handleRequestForRevisionClick}>Request for
                                        Revision</Button>
                                    <RequestRevisionModal
                                        show={showRequestRevisionModal}
                                        onHide={handleRequestForRevisionClick}
                                        document={document}
                                    />
                                    <Button onClick={handlePublishClick}>Publish</Button>
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
            <Container fluid="md">
                <Row>
                    <Card>
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}><strong>{document.title}</strong></Card.Title>
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