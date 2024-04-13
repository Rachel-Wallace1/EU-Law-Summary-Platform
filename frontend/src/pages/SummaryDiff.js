import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";
import {useParams, useLocation} from "react-router-dom";
import SummaryVersionDiffComponent from "../components/SummaryVersionDiffComponent";


function SummaryDiff() {
    let {celex} = useParams();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const currentVersion = searchParams.get('current');
    const previousVersion = searchParams.get('previous');

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