import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";
import {useParams} from "react-router-dom";
import SummaryTimelineComponent from "../components/SummaryTimelineComponent";


function SummaryTimeline() {
    let {celex} = useParams(); // get celex from url params

    return (
        <Container className="summaries-page">
            <PageHeaderComponent title={`${celex} Timeline`}/>
            <Row>
                <Col>
                    <SummaryTimelineComponent celex={celex} />
                </Col>
            </Row>
        </Container>
    );
}

export default SummaryTimeline;