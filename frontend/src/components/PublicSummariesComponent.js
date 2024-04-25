import React from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import {
    FaTractor,
    FaMusic,
    FaWallet,
    FaStoreAlt,
    FaUserFriends,
    FaStreetView,
    FaUserSecret,
    FaHardHat,
    FaMoneyBill,
    FaBatteryHalf,
    FaExpandArrowsAlt,
    FaBusinessTime
} from "react-icons/fa"
import {useNavigate} from "react-router-dom";

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

const topics = [
    {name: 'Agriculture', icon: <FaTractor/>, filter: 'agriculture'},
    {name: 'Audiovisual and Media', icon: <FaMusic/>, filter: 'audiovisual-and-media'},
    {name: 'Budget', icon: <FaWallet/>, filter: 'budget'},
    {name: 'Competition', icon: <FaStoreAlt/>, filter: 'competition'},
    {name: 'Consumers', icon: <FaUserFriends/>, filter: 'consumers'},
    {name: 'Culture', icon: <FaStreetView/>, filter: 'culture'},
    {name: 'Customs', icon: <FaUserSecret/>, filter: 'customs'},
    {name: 'Development', icon: <FaHardHat/>, filter: 'development'},
    {name: 'Economic and Monetary Affairs', icon: <FaMoneyBill/>, filter: 'economic-and-monetary-affairs'},
    {name: 'Energy', icon: <FaBatteryHalf/>, filter: 'energy'},
    {name: 'Enlargement', icon: <FaExpandArrowsAlt/>, filter: 'enlargement'},
    {name: 'Enterprise', icon: <FaBusinessTime/>, filter: 'enterprise'},
];

function PublicSummariesComponent() {
    const navigate = useNavigate();

    const handleClick = (filter) => {
        navigate(`/summaries?category=${filter}`)
    };

    const handleMouseOver = (e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
    };

    const handleMouseOut = (e) => {
        e.currentTarget.style.transform = 'none';
    };

    return (
        <Container>
            <Row xs={1} md={2} lg={4} className="g-4">
                {topics.map((topic, idx) => (
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