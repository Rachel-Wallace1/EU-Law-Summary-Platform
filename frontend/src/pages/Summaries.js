import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";
import SummariesComponent from "../components/SummariesComponent";
import {useSearchParams} from "react-router-dom";


function Summaries() {
    let [searchParams, setSearchParams] = useSearchParams();
    let category = searchParams.get('category');

    return (
        <Container className="summaries-page">
            <PageHeaderComponent title={'Summaries'}/>
            <Row>
                <Col>
                    <SummariesComponent category={category}/>
                </Col>
            </Row>
        </Container>
    );
}

export default Summaries;