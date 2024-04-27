import React from 'react';
import ViewDocumentComponent from "../components/ViewDocumentComponent";
import { Container, Row, Col } from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";
import {useLocation, useParams} from "react-router-dom";


function ViewSummary() {
    let {celex} = useParams();
    const location = useLocation();
    const { editedSummary } = location.state || '';

    return (
        <Container className="summaries-page">
            <PageHeaderComponent title={'View Summary'}/>
            <Row>
                <Col>
                    <ViewDocumentComponent celex={celex} editedSummary={editedSummary} />
                </Col>
            </Row>
        </Container>
    );
}

export default ViewSummary;