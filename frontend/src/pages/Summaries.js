import React from 'react';
import DocumentComponent from "../components/DocumentComponent";
import { Container, Row, Col } from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";


function Summaries() {
    return (
        <Container className="summaries-page">
            <PageHeaderComponent title={'Curator Dashboard'}/>
            <Row>
                <Col>
                    <DocumentComponent />
                </Col>
            </Row>
        </Container>
    );
}

export default Summaries