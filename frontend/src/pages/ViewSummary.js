import React from 'react';
import ViewDocumentComponent from "../components/ViewDocumentComponent";
import { Container, Row, Col } from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";


function ViewSummary() {
    return (
        <Container className="summaries-page">
            <PageHeaderComponent title={'View Summary'}/>
            <Row>
                <Col>
                    <ViewDocumentComponent />
                </Col>
            </Row>
        </Container>
    );
}

export default ViewSummary;