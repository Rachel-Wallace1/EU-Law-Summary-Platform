import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";
import SummariesComponent from "../components/SummariesComponent";


function Summaries() {
    return (
        <Container className="summaries-page">
            <PageHeaderComponent title={'Summaries'}/>
            <Row>
                <Col>
                    <SummariesComponent />
                </Col>
            </Row>
        </Container>
    );
}

export default Summaries;