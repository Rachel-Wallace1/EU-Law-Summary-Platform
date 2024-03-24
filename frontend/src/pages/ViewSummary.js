import React from 'react';
import ViewDocumentComponent from "../components/ViewDocumentComponent";
import { Container, Row, Col } from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";
import {useParams} from "react-router-dom";


function ViewSummary() {
    let {celex} = useParams();

    return (
        <Container className="summaries-page">
            <PageHeaderComponent title={'View Summary'}/>
            <Row>
                <Col>
                    <ViewDocumentComponent celex={celex} />
                </Col>
            </Row>
        </Container>
    );
}

export default ViewSummary;