import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

// PageHeaderComponent reusable component to set the page title
function PageHeaderComponent({title}) {
    return (
        <Container className={'text-start'}
                   style={{borderBottom: '1px solid rgba(0, 0, 0, 0.3)', margin: '30px'}}>
            <Row>
                <Col>
                    <h1>{title}</h1>
                </Col>
            </Row>
        </Container>
    )
}

export default PageHeaderComponent;