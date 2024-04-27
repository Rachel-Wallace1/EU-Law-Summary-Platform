import React, {useState} from 'react';
import {Card, Container, Row, Col, Button, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useCSRFToken} from './CSRFTokenContext.js'

function EditDocumentComponent({document}) {
    const {csrfToken} = useCSRFToken();
    const navigate = useNavigate();
    const [documentText, setDocumentText] = useState(document.current.summary || ''); // 
    const handleTextChange = (event) => {
        setDocumentText(event.target.value);
    };
    

    const handleCancelClick = () => {
        navigate(`/summary/${document.celexNumber}/view`)
    };


    const handleSaveClick = async (e) => {
        e.preventDefault();
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
                    author: document.current.author,
                    status: "",
                    summary: documentText,
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await response.json();
            
            // Navigate to the "/Summaries" page
            navigate(`/summary/${document.celexNumber}/view`)
            
        } catch (error) {
            console.error('Error:', error);
        } 
    };
    return (
        <Container>
            <Container>
                <Row className="justify-content-between" style={{marginBottom: '5px'}}>
                    <Col xs="auto">
                        <div className="d-flex gap-2">
                            <Button variant="danger" onClick={handleCancelClick}>Cancel</Button>
                            <Button variant="success"onClick={handleSaveClick}>Save</Button>
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