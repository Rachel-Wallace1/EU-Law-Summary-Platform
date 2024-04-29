import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";
import PublicSummariesComponent from "../components/PublicSummariesComponent";
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import {UserRole, UserRoleIntToStringMapping} from "../components/enums";

function HomePage() {
    const { isLoggedIn, user } = useAuth();
    const userRoleAsString = UserRoleIntToStringMapping[user.role];
    const navigate = useNavigate();

    if (isLoggedIn) {
        if ([UserRole.MANAGER, UserRole.EDITOR, UserRole.LEGAL_EXPERT].includes(userRoleAsString)) {
            navigate('/summaries');
        }
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
