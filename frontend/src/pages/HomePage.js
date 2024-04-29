import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";
import PublicSummariesComponent from "../components/PublicSummariesComponent";
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import {UserRole, UserRoleIntToStringMapping} from "../components/enums";

function HomePage() {
    const { isLoggedIn, user } = useAuth(); // get isLoggedIn and user from auth context
    const userRoleAsString = UserRoleIntToStringMapping[user.role]; // maps user role into a string
    const navigate = useNavigate(); // hook from react router dom to enable navigation

    // if user is logged in AND user is a MANAGER, EDITOR, or LEGAL EXPERT then navigate to /summaries
    if (isLoggedIn) {
        if ([UserRole.MANAGER, UserRole.EDITOR, UserRole.LEGAL_EXPERT].includes(userRoleAsString)) {
            navigate('/summaries');
        }
    }

    // if user is NOT logged in then navigate them to the public citizen view
    return (
        <Container className="summaries-page">
            <PageHeaderComponent title='Summaries of EU Legislation by Topic'/> {/* page title */}
            <Row>
                <Col>
                    <PublicSummariesComponent /> {/* component for Public Citizen View */}
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
