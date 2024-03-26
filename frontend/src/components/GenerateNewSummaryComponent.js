import React, {useState, useEffect} from 'react';
import {Card, Container, Row, Col, Button, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function GenerateNewSummaryComponent({document}) {
    const navigate = useNavigate();
    const [documentText, setDocumentText] = useState('');
    const [inputText, setInputText] = useState('');
    const [response, setResponse] = useState('');
    const [index, setIndex] = useState(0);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Send request to OpenAI API
        try {
          const response = await fetch('http://localhost:8000/api/summaries/openai/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input_message: inputText,
            })
          });
          
          const responseData = await response.json();
          setResponse(responseData); 
          setIndex(0); // Reset index for incremental display
          startIncrementalDisplay();
        } catch (error) {
          console.error('Error:', error);
          // Handle error
        }
    };
    const startIncrementalDisplay = () => {
        const interval = setInterval(() => {
          if (index < response.length) {
            setIndex(prevIndex => prevIndex + 1);
          } else {
            clearInterval(interval);
          }
        }, 20);  
    };
    
    useEffect(() => {
        setDocumentText('The link provided points to the legal text..')
    }, [])
    const handleTextChange = (event) => {
        setDocumentText(event.target.value);
    };

    const handleClearSummaryClick = () => {
        setDocumentText('');
    };

    const handleCancelClick = () => {
        navigate(`/summary/${document.celex}/view`)
    };
    
      

    return (<Container>
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
                                name="prompt"
                                rows={2}
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Enter text here..."
                            />
                            <Button type="submit" onClick={handleSubmit}>Submit</Button>
                    </Card.Body>                 
                    <Card.Body>
                            <Form.Control
                                as="textarea"
                                name="prompt"
                                value={response.slice(0, index)}
                                onChange={(e) => setResponse(e.target.value)}
                            />
                       
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    </Container>);
}

export default GenerateNewSummaryComponent;