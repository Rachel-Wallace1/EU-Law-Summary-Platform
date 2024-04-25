import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";
import PublicSummariesComponent from "../components/PublicSummariesComponent";
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    if (isLoggedIn) {
        navigate('/summaries');
    }

    return (
        <Container className="summaries-page">
            <PageHeaderComponent title='Summaries of EU Legislation by Topic'/>
            <Row>
                <Col>
                    <PublicSummariesComponent />
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
