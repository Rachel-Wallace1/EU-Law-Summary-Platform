import React, {useState} from 'react';
import {Card, Container, Row, Col, Button, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function EditDocumentComponent({document}) {
    const navigate = useNavigate();

    const [documentText, setDocumentText] = useState(document.title || '');
    const handleTextChange = (event) => {
        setDocumentText(event.target.value);
    };

    const handleClearSummaryClick = () => {
        setDocumentText('');
    };

    const handleCancelClick = () => {
        navigate(`/summary/${document.celex}/view`)
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
                            <Button variant="success">Save</Button>
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
                                rows={3}
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