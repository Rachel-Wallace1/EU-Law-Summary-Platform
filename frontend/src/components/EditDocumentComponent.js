import React, {useState} from 'react';
import {Card, Container, Row, Col, Button, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

// EditDocumentComponent component to edit document
function EditDocumentComponent({document}) {
    const navigate = useNavigate(); // hook from react router dom to enable navigation
    const [documentText, setDocumentText] = useState(document.current.summary || '');

    // on document text change update the documentText state
    const handleTextChange = (event) => {
        setDocumentText(event.target.value);
    };

    // on document text clear click update the documentText state to empty
    const handleClearSummaryClick = () => {
        setDocumentText('');
    };

    // on cancel click, redirect back to the view document page
    const handleCancelClick = () => {
        navigate(`/summary/${document.celexNumber}/view`)
    };

    // on save click, redirect back to the view document page with the update documentText
    const handleSaveClick = () => {
        navigate(`/summary/${document.celexNumber}/view`, { state: { editedSummary: documentText } });
    };

    return (
        <Container>
            <Container>
                <Row className="justify-content-between" style={{marginBottom: '5px'}}>
                    <Col xs="auto">
                        <Button variant="danger" onClick={handleClearSummaryClick}>Clear Summary</Button>
                    </Col>
                    <Col xs="auto">
                        <div className="d-flex gap-2">
                            <Button variant="danger" onClick={handleCancelClick}>Cancel</Button>
                            <Button variant="success" onClick={handleSaveClick}>Save</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container fluid="md">
                <Row>
                    <Card>
                        <Card.Body>
                            <Form.Control
                                as="textarea"
                                rows={30}
                                value={documentText}
                                onChange={handleTextChange}
                            />
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </Container>
    );
}

export default EditDocumentComponent;