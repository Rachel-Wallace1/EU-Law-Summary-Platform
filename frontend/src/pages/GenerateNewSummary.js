
import React from 'react';
import {useLocation} from 'react-router-dom';
import {Col, Container, Row} from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";
import NewDocumentComponent from "../components/GenerateNewSummaryComponent";
import './NewSummary.css';
import { FaFileAlt } from 'react-icons/fa';

// NewSummary component displays a generate summary form
function NewSummary() {
    const location = useLocation();
    const {document} = location.state || {}; // get document from previous page

    return (
        <Container className="summaries-page">
            <PageHeaderComponent
            title={
                <>
                <FaFileAlt style={{ marginRight: '0.5rem' }} /> Generate Summary 
                </>
            }
            />
            <Row>
                <Col>
                    <NewDocumentComponent document={document}/>
                </Col>
            </Row>
        </Container>
    );
}

export default NewSummary;
