import React, {useState, useEffect} from 'react';
import {Card, Container, Row, Col, Button, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { useCSRFToken } from './CSRFTokenContext';

// GenerateNewSummaryComponent component renders a form to generate a new summary
function GenerateNewSummaryComponent({document}) {
    const navigate = useNavigate(); // hook from react router dom enabling navigation
    const {csrfToken} = useCSRFToken(); // get csrfToken from context
    const openai_key = localStorage.getItem('openai_key'); // get openai_key from browser storage
    const [inputText, setInputText] = useState('');
    const [tokenCompression, setTokenCompression] = useState('');
    const [temperature, setTemperature] = useState('');
    const [summary, setsummary] = useState('');
    const [index, setIndex] = useState(0);
    const [celexNumber, setCelexNumber] = useState('');
    const [title, setTitle] = useState('');
    const [saved, setSaved] = useState(false);
    const [apiToken, setApiToken] = useState('');
    const [loading, setLoading] = useState(false);

    // Waiting is a loading spinner component to display while summary is being generated
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

    // on submit, call backend openai endpoint to generate new summary given input_message, tokenCompression, temperature, and apiToken
    // on success, update summary state
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        

        try {

            
            const summary = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/summaries/openai/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify({
                    input_message: inputText,
                    apiToken:`${openai_key}`,
                    tokenCompression: `${tokenCompression}`,
                    temperature: `${temperature}`,
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
        } finally {
            setLoading(false);
        }
    };

    // on summary OR index change, start the increment display interval
    useEffect(() => {
        if (summary.length > 0) {
            startIncrementalDisplay();
        }
    }, [summary, index]);

    // function to start an interval
    const startIncrementalDisplay = () => {
        const interval = setInterval(() => {
          if (index < summary.length) {
            setIndex(prevIndex => prevIndex + 1);
          } else {
            clearInterval(interval);
          }
        }, 20);  
    };
    
    // on clear summary click, clear summary
    const handleClearSummaryClick = () => {
        setCelexNumber(''); 
        setTitle(''); 
        setsummary(''); 
        setSaved(false)
    };

    const handleCancelClick = () => {
        navigate(`/summaries`)
    };

    // function to call backend and save updated document
    const handleSave = async (e) => {
        e.preventDefault();
        try {
        const data = {
            celexNumber: celexNumber,
            title: title,
            summary: summary
          };
        
          fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/submit/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            
            body: JSON.stringify(data)
          })
          .then(response => {
            if (response.ok) {
              setSaved(true);
              
              console.log('Data saved successfully!');
            } else {
              console.error('Failed to save data.');
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
        } catch (error) {
            console.error('Error:', error);
        }
      
      };
    

      
    return (<div>
            <Container>

                <Container>
                    <Card>
                        <Card.Body>
                            {/* {openai_key === null && (
                                <Form.Control
                                    type="password"
                                    name="apiToken"
                                    value={apiToken}
                                    onChange={(e) => setApiToken(e.target.value)}
                                    placeholder="Enter your OpenAI API token..."
                                />
                            )} */}

                            {/* Text input for EU HTML link */}
                            <Form.Control
                                type="text"
                                name="prompt"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="
                                Enter EU link.."
                            />
                            <div class="token-compression">
                            <Form.Group controlId="tokenCompressionSwitch">
                            <Form.Check
                                type="switch"
                                id="tokenCompressionSwitch"
                                label="Token Compression"
                                checked={tokenCompression}
                                onChange={(e) => setTokenCompression(e.target.checked)}
                            />
                            </Form.Group>

                            <Form.Group controlId="temperature">
                                <Form.Label>Temperature</Form.Label>
                                <input
                                    type="range"
                                    id="temperature"
                                    className="wider-range"  
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    value={temperature}
                                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                                    style={{
                                        background: `linear-gradient(to right, blue ${temperature * 100}%, red ${temperature * 100}%)`,
                                        width: '100%',
                                        cursor: 'pointer'
                                    }}
                                />
                                <Form.Text>Current number: {temperature}</Form.Text>
                            </Form.Group>

                            </div>

                            <div>
                            {/* Conditionally render the Waiting component while loading is true */}

                            {/* Your form and button */}
                            <Col xs="auto">
                                <Button type="submit" onClick={handleSubmit} >
                                Submit
                                </Button>
                            </Col>
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
                                    <div
                                        style={{ minHeight: '550px', border: '1px solid #ced4da', padding: '5px' }}
                                        onBlur={(e) => setsummary(e.target)}
                                        dangerouslySetInnerHTML={{ __html: summary.slice(0, index) }}
                                        disabled={saved}
                                    ></div>
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