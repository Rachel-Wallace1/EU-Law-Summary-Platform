import React, {useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {Col, Container, Form, Row} from 'react-bootstrap';
import EditDocumentComponent from "../components/EditDocumentComponent";
import PageHeaderComponent from "../components/PageHeaderComponent";

function EditSummary() {
    let {celex} = useParams();
    const location = useLocation();
    const {document} = location.state || {};

    return (
        <Container className="summaries-page">
            <PageHeaderComponent title={`Edit > ${document.title}`}/>
            <Row>
                <Col>
                    <EditDocumentComponent document={document}/>
                </Col>
            </Row>
        </Container>
    );
}

export default EditSummary;