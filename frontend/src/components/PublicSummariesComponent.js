import React from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import {TopicFilters} from "./enums";

const cardStyle = {
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
    height: '150px',
    position: 'relative',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    marginBottom: '20px',
};

const iconStyle = {
    position: 'absolute',
    fontSize: '2em',
    bottom: '15px',
    right: '15px',
};

function PublicSummariesComponent() {
    const navigate = useNavigate(); // hook from react router dom to enable navigation

    // onClick, navigate user to /summaries with a category filter
    const handleClick = (filter) => {
        navigate(`/summaries?category=${filter}`)
    };

    // onMouseOver, change the style to show a hover
    const handleMouseOver = (e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
    };

    // onMouseOut, change the style to show a non-hover
    const handleMouseOut = (e) => {
        e.currentTarget.style.transform = 'none';
    };

    return (
        <Container>
            <Row xs={1} md={2} lg={4} className="g-4">
                {/* gets the TopicFilters from enums.js and iterates over them to create the Public Citizen View below */}
                {TopicFilters.map((topic, idx) => (
                    <Col key={idx}>
                        <Card
                            style={cardStyle}
                            onClick={() => handleClick(topic.filter)}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            <Card.Body>
                                <Card.Title>{topic.name}</Card.Title>
                                <Card.Text as="div">
                                    <div style={iconStyle}>
                                        {topic.icon}
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default PublicSummariesComponent;