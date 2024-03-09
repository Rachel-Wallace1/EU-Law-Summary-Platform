import React from 'react';
import {Card, Container, Row, Col, Button} from 'react-bootstrap';

function DocumentComponent() {
    const document = {
        title: "The common organization of agricultural markets in the EU",
        summaryOf: "Regulation (EU) No 1308/2013 — common organization of the markets in agricultural products",
        aim: [
            "It aims at stabilizing markets and preventing market crises from escalating by providing a safety net to agricultural markets.",
            "It aims at improving productivity and quality at the production level, boosting demand.",
            "It seeks to encourage cooperation within the food supply chain through producer organizations."
        ],
        status: "pending_review" // change this to publish and actionable buttons will be removed
    };

    return (
        <Container>
            {document.status !== "published" && <Container>
                <Row className="justify-content-between" style={{marginBottom: '5px'}}>
                    <Col xs="auto">
                        <Button variant="primary">Timeline</Button>
                    </Col>
                    <Col xs="auto">
                        <div className="d-flex gap-2">
                            <Button variant="primary">New Summary</Button>
                            <Button variant="warning">Edit</Button>
                            <Button variant="success">Send</Button>
                        </div>
                    </Col>
                </Row>
            </Container>}
            <Container fluid="md">
                <Row>
                    <Card>
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}><strong>{document.title}</strong></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"><strong>SUMMARY OF:</strong></Card.Subtitle>
                            <Card.Text><u>{document.summaryOf}</u></Card.Text>
                            <Card.Subtitle className="mb-2"><strong>WHAT IS THE AIM OF THE
                                REGULATION?</strong></Card.Subtitle>
                            <ul className="list-unstyled" style={{paddingLeft: '20px', listStyleType: 'disc'}}>
                                {document.aim.map((point, index) => (
                                    <li key={index} style={{paddingLeft: '10px'}}>{point}</li>
                                ))}
                            </ul>
                            <Card.Subtitle className="mb-2"><strong>KEY POINTS</strong></Card.Subtitle>
                            <Card.Text>The main rules set out in the regulation are divided into several parts. The
                                European Commission is granted the power to adopt additional delegated and implementing
                                acts to further elaborate upon these rules.</Card.Text>
                            <Card.Subtitle className="mb-2"><strong>BACKGROUND</strong></Card.Subtitle>
                            <Card.Subtitle className="mb-2"><strong>KEY TERMS</strong></Card.Subtitle>
                            <Card.Subtitle className="mb-2"><strong>MAIN DOCUMENT</strong></Card.Subtitle>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </Container>
    );
}

export default DocumentComponent;