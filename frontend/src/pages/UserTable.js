// import React, {useState} from 'react';
// import {useParams, useLocation} from 'react-router-dom';
import {Col, Container, Row} from 'react-bootstrap';
import UserTableComponent from "../components/UserTableComponent";
import PageHeaderComponent from "../components/PageHeaderComponent";

function UserTable() {

    return (
        <Container className="summaries-page">
            <PageHeaderComponent title={`User Table`}/>
            <Row>
                <Col>
                <UserTableComponent />
                </Col>
            </Row>
        </Container>
    );
}

export default UserTable;