import React, {useEffect} from 'react';
import {Card, Container, Row, Col, Button, Modal, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import DOMPurify from 'dompurify';
import ReviewerSelectionModal from './ReviewerSelectionModal';
import PublishConfirmationModal from './PublishConfirmationModal';

function GenerateSummaryModal({ show, onHide, celex, generateSummaryClick }) {
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
                    Generate Summary
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div key={`llm-model-radio`} className="mb-3">
                    <Form.Check
                        inline
                        label="gpt4 LLM model"
                        name="llm-radio"
                        type='radio'
                        id={`inline-radio-1`}
                    />
                    <Form.Check
                        inline
                        label="2nd LLM model"
                        name="llm-radio"
                        type='radio'
                        id={`inline-radio-2`}
                    />
                </div>
                <Form.Label htmlFor="celexId">Celex Number</Form.Label>
                <Form.Control
                    type="text"
                    id="celexId"
                    value={celex}
                    disabled={true}
                    aria-describedby="passwordHelpBlock"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={generateSummaryClick}>Generate Summary</Button>
            </Modal.Footer>
        </Modal>
    );
}
function DeleteSummaryModal({ show, onHide, celex, deleteSummaryClick }) {
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
                <Form.Label htmlFor="celexId">Do you really want to delete this summary? This process cannot be undone.</Form.Label>
                <Modal.Footer>
                <Button variant="danger" onClick={deleteSummaryClick}>Yes, delete it</Button>
                </Modal.Footer>
            </Modal.Body>

        </Modal>
        

    );
}

function sanitizeAndFormatString(str) {
    const escapedStr = str.replace(/[&<>"']/g, function(match) {
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


function ViewDocumentComponent({celex}) {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowDelete, setModalShowDelete] = React.useState(false);
    const [document, setDocument] = React.useState({});
    const [showReviewerModal, setShowReviewerModal] = React.useState(false);
    const [showPublishConfirmModal, setShowPublishConfirmModal] = React.useState(false);
    const formattedSummary = document && document.current && document.current.summary
        ? sanitizeAndFormatString(document.current.summary)
        : 'No existing summary found';


    // Onload call the backend to fetch the summary
    useEffect(() => {
        // TODO uncomment this once the backend api is working
        const fetchSummaryByCelex = async () => {
            try {
                const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/edit/${celex}`);
                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)
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
    const handleDeleteClick = async(e) => {
        
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
    

    const handlePublishClick = () => {
        setShowPublishConfirmModal(true);
    }

    return (
        <Container>
            {/*TODO re-add once document contains status*/}
            {/*{document.status !== "published" && <Container>*/}
            {<Container>
                <Row className="justify-content-between" style={{marginBottom: '5px'}}>
                    <Col xs="auto">
                        <Button variant="primary" onClick={handleTimelineClick}>Timeline</Button>
                    </Col>
                    <Col xs="auto">
                        <div className="d-flex gap-2">
                            <Button variant="primary" onClick={() => setModalShow(true)}>
                                New Summary
                            </Button>
                            <GenerateSummaryModal
                                celex={celex}
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                generateSummaryClick={handleGenerateSummaryClick}
                            />
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
                            />
                            <Button onClick={handlePublishClick}>Publish</Button>
                            <PublishConfirmationModal
                                show={showPublishConfirmModal}
                                onHide={() => setShowPublishConfirmModal(false)}
                            />                        </div>
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