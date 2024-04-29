import React from 'react';
import ViewDocumentComponent from "../components/ViewDocumentComponent";
import { Container, Row, Col } from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";
import {useLocation, useParams} from "react-router-dom";


function ViewSummary() {
    let {celex} = useParams(); // hook from react router dom to get params from url
    const location = useLocation(); // hook from react router dom to be able to pass data from previous pages
    const { editedSummary } = location.state || ''; // get the editedSummary data from previous page

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