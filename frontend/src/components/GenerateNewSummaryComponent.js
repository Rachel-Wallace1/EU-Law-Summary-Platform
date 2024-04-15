import React, {useState, useEffect} from 'react';
import {Card, Container, Row, Col, Button, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function GenerateNewSummaryComponent({document}) {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState('');
    const [summary, setsummary] = useState('');
    const [index, setIndex] = useState(0);
    const [celexNumber, setCelexNumber] = useState('');
    const [title, setTitle] = useState('');
    const [saved, setSaved] = useState(false);
    const [apiToken, setApiToken] = useState('');
    const [loading, setLoading] = useState(false);

    const Waiting = () => {
        const [rotationAngle, setRotationAngle] = useState(0);
    
        useEffect(() => {
            const interval = setInterval(() => {
                setRotationAngle(angle => angle + 1); // Increment rotation angle
            }, 100); // Set the interval to update the rotation angle
    
            return () => clearInterval(interval); // Clear the interval on component unmount
        }, []);
    
        return (
            <div className="loading-container">
                {/* You can use any loading animation or image here */}
                <div className="loading-spinner" style={{ transform: `rotate(${rotationAngle}deg)` }}></div>
                <p>Loading...</p>
            </div>
        );
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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
                    apiToken: apiToken,
                })
            });
            
            const summaryData = await summary.json();
            setSaved(false)
            setsummary(summaryData.bot_response);
            setCelexNumber(summaryData.celex);
            setTitle(summaryData.title)
            
            setIndex(0); 
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        } finally {
            // Set loading state to false when API request completes (whether it succeeded or failed)
            setLoading(false);
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
    


    const handleClearSummaryClick = () => {
        setCelexNumber(''); 
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
                    <Card>
                        <Card.Body>
                        <div class="input-group">
                            {/* Input for API token */}
                            <Form.Control
                                type="password"
                                name="apiToken"
                                value={apiToken}
                                onChange={(e) => setApiToken(e.target.value)}
                                placeholder="Enter your OpenAI API token..."
                            />
                            
                            {/* Text input for EU HTML link */}
                            <Form.Control
                                type="text"
                                name="prompt"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="EU HTML link..."
                            />
                            <div>
                            {/* Conditionally render the Waiting component while loading is true */}

                            {/* Your form and button */}
                            <Col xs="auto">
                                <Button type="submit" onClick={handleSubmit} >
                                Submit
                                </Button>
                            </Col>
                            </div>
                            
                        </div>
                        </Card.Body>
                    </Card>
                </Container>
                <Container>
                    <Card>
                        <Card.Body>
                            <form onSubmit={handleSave} >
                                {/* Celex Number input */}
                                <div class="input-group">
                                <Form.Group controlId="celexNumber" >
                                    <Form.Control
                                    type="text"
                                    placeholder="Celex Number"
                                    value={celexNumber}
                                    onChange={(e) => setCelexNumber(e.target.value)}
                                    />
                                </Form.Group>
                                {/* Title input */}
                                <Form.Group controlId="title" className="w-50" >
                                    <Form.Control
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)
                                    }
                                    />
                                </Form.Group>
                                <Col xs="auto">
                                <Button type="clear" variant="danger" onClick={handleClearSummaryClick}>Clear Summary</Button>
                                </Col>
                                </div>

                                {/* Summary textarea */}
                                <Form.Group controlId="summary">
                                    {loading && <Waiting />}
                                    <Form.Control
                                    as="textarea"
                                    rows={50}
                                    value={summary.slice(0, index)}
                                    onChange={(e) => setsummary(e.target.value)}
                                    disabled={saved}
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