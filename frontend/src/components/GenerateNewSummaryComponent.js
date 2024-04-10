import React, {useState, useEffect} from 'react';
import {Card, Container, Row, Col, Button, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function GenerateNewSummaryComponent({document}) {
    const navigate = useNavigate();
    const [documentText, setDocumentText] = useState('');
    const [inputText, setInputText] = useState('');
    const [summary, setsummary] = useState('');
    const [index, setIndex] = useState(0);
    const [celexNumber, setCelexNumber] = useState('');
    const [title, setTitle] = useState('');
    const [saved, setSaved] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Send request to OpenAI API
        try {
            console.log('1. I was triggered during first block');
    
            const summary = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/summaries/openai/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input_message: inputText,
                })
            });
            
            const summaryData = await summary.json();
            setsummary(summaryData);
            setIndex(0); // Reset index for incremental display
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };
    
    useEffect(() => {
        // Start incremental display only after summary data and index are updated
        if (summary.length > 0) {
            startIncrementalDisplay();
        }
    }, [summary, index]);
    
    const startIncrementalDisplay = () => {
        const interval = setInterval(() => {
          if (index < summary.length) {
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
        setInputText('');  
        setCelexNumber(''); // Clear the Celex Number
        setTitle(''); 
        setsummary(''); 
        setSaved(false)
    };

    const handleCancelClick = () => {
        navigate(`/summaries`)
    };



    const handleSave = async (e) => {
        e.preventDefault();
        try {
        const data = {
            celexNumber: celexNumber,
            title: title,
            summary: summary
          };
          console.log('I was triggered')
          console.log(data)
          console.log(celexNumber)
        
          // Fetch API to post data
          fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/submit/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            
            body: JSON.stringify(data)
          })
          .then(response => {
            if (response.ok) {
              // Data successfully saved
              setSaved(true);
              
              console.log('Data saved successfully!');
            } else {
              // Error occurred while saving data
              console.error('Failed to save data.');
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
      
      };
    

      
    return (<div>
            <Container>
                <Container>
                    <Row className="justify-content-between" style={{marginBottom: '5px'}}>
                        <Col xs="auto">
                            <Button type="clear" variant="danger" onClick={handleClearSummaryClick}>Clear Summary</Button>
                        </Col>
                        <Col xs="auto">
                            <div className="d-flex gap-2">
                                <Button type="clear" variant="danger" onClick={handleCancelClick}>Cancel</Button>
                            
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Card>
                        <Card.Body>
                            {/* Textarea for input text */}
                            <Form.Control
                            as="textarea"
                            name="prompt"
                            rows={2}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Enter text here..."
                            />
                            {/* Submit button */}
                            <Button type="submit" onClick={handleSubmit} className="mt-2">
                            Submit
                            </Button>
                        </Card.Body>
                    </Card>
                </Container>
                <Container>
                    <Card>
                        <Card.Body>
                            <form onSubmit={handleSave} style={{ width: '100%' }}>
                                {/* Celex Number input */}
                                <Form.Group controlId="celexNumber" style={{ width: '100%' }}>
                                    <Form.Label>Celex Number</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="Enter Celex Number"
                                    value={celexNumber}
                                    onChange={(e) => setCelexNumber(e.target.value)}
                                    style={{ width: '100%' }}
                                    />
                                </Form.Group>
                                {/* Title input */}
                                <Form.Group controlId="title" >
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="Enter Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)
                                    }
                                    style={{ width: '100%' }}
                                    />
                                </Form.Group>
                                {/* Summary textarea */}
                                <Form.Group controlId="summary">
                                    <Form.Label>Summary</Form.Label>
                                    <Form.Control
                                    as="textarea"
                                    rows={5}
                                    value={summary.slice(0, index)}
                                    onChange={(e) => setsummary(e.target.value)}
                                    disabled={saved}
                                    style={{ width: '100%' }}
                                    />
                                </Form.Group>
                            {/* Save button */}
                                <Button type="submit2" className="btn btn-success" disabled={saved}>
                                    Save to Database
                                </Button>
                            </form>
                </Card.Body>
            </Card>
        </Container>

     </Container>
     </div>
     
     );
}


export default GenerateNewSummaryComponent;