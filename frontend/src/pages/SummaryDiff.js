import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";
import {useParams, useLocation} from "react-router-dom";
import SummaryVersionDiffComponent from "../components/SummaryVersionDiffComponent";

// SummaryDiff component displays the diff between two summary versions
function SummaryDiff() {
    let {celex} = useParams(); // get celex from url params
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const currentVersion = searchParams.get('current'); // get currentVersion from url params
    const previousVersion = searchParams.get('previous'); // get previousVersion from url params

    return (
        <Container className="summaries-page">
            <PageHeaderComponent title={`${celex ? celex + ' ' : ''}Version Comparison: v${currentVersion} vs v${previousVersion}`}/>
            <Row>
                <Col>
                    <SummaryVersionDiffComponent celex={celex} currentVersion={currentVersion} previousVersion={previousVersion} />
                </Col>
            </Row>
        </Container>
    );
}

export default SummaryDiff;