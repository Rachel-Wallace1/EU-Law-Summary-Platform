import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";
import SummariesComponent from "../components/SummariesComponent";
import {useSearchParams} from "react-router-dom";


function Summaries() {
    let [searchParams, setSearchParams] = useSearchParams(); // hook from react router dom to get the search params from url
    let category = searchParams.get('category'); // get category from url search params

    return (
        <Container className="summaries-page">
            <PageHeaderComponent title={'Summaries'}/>
            <Row>
                <Col>
                    <SummariesComponent category={category}/> {/* render SummariesComponent with props */}
                </Col>
            </Row>
        </Container>
    );
}

export default Summaries;