import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SummariesComponent() {
    const navigate = useNavigate();

    const document = {
        celex: '12345',
        title: "The common organization of agricultural markets in the EU",
        summaryOf: "Regulation (EU) No 1308/2013 — common organization of the markets in agricultural products",
        aim: [
            "It aims at stabilizing markets and preventing market crises from escalating by providing a safety net to agricultural markets.",
            "It aims at improving productivity and quality at the production level, boosting demand.",
            "It seeks to encourage cooperation within the food supply chain through producer organizations."
        ],
        status: "pending_review" // change this to publish and actionable buttons will be removed
    };
    const handleEditClick = () => {
        navigate(`/summaries/${document.celex}/edit`, {state: {document}})
    }

    return (
        <Container>
            {document.status !== "published" && <Container>
                <Row className="justify-content-between" style={{marginBottom: '5px'}}>
                    <Col xs="auto">
                        <Button variant="primary">Timeline</Button>
                    </Col>
                    <Col xs="auto">
                        <div className="d-flex gap-2">
                            <Button variant="warning" onClick={handleEditClick}>Edit</Button>
                            <Button variant="success">Send</Button>
                        </div>
                    </Col>
                </Row>
            </Container>}
        </Container>
    );
}

export default SummariesComponent;