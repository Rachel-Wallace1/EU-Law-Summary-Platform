import React, {useState, useEffect} from 'react';
import {Card, Container, Row, Col, Button, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function NewDocumentComponent({document}) {
    const navigate = useNavigate();
    const [documentText, setDocumentText] = useState('');

    useEffect(() => {
        setDocumentText('The link provided points to the legal text of the Council Directive (EU) 2019/633 of 17 April 2019 on unfair trading practices in business-to-business relationships in the agricultural and food supply chain. This directive was enacted by the European Parliament and the Council of the European Union.\\n\\nSummary of the Directive (EU) 2019/633:\\n\\nPurpose: The directive aims to protect smaller suppliers in the agricultural and food supply chain from unfair trading practices (UTPs) by larger buyers. Such practices can undermine the financial viability of suppliers, and the directive seeks to promote fairness and equality.\\n\\nScope:\\n- The directive covers agricultural and food products traded in the supply chain, extending to farmers, agribusinesses, and food companies within the European Union.\\n- It targets UTPs in business-to-business relationships where there is a significant imbalance in bargaining power between suppliers and buyers.\\n\\nMain Provisions:\\n- The directive lists specific unfair trading practices that are prohibited. This includes late payments, last-minute order cancellations, unilateral or retroactive contract changes, and forcing the supplier to pay for wasted products.\\n- Suppliers are protected against retaliation when they file complaints regarding UTPs.\\n- The directive requires EU Member States to designate public authorities to enforce the rules and impose penalties for infringements.\\n- Member States must also ensure that suppliers have access to confidential complaint procedures.\\n\\nImplementation:\\n- EU countries must adopt and publish the laws, regulations, and administrative provisions necessary to comply with the directive.\\n- They must also communicate the measures they take to the European Commission.\\n- The directive contains provisions for the assessment and reporting of the implemented measures to ensure their effectiveness.\\n\\nIn summary, Directive (EU) 2019/633 sets out a framework to protect suppliers in the food supply chain from unfair trading practices by larger buyers, with the objective of creating a fairer and more balanced food supply chain within the EU. It establishes prohibited practices, provides for the creation of enforcement authorities in each Member State, and outlines procedures to handle complaints confidentially. Member States are required to implement the necessary national measures to comply with the directive and report on their effectiveness.')
    }, [])
    const handleTextChange = (event) => {
        setDocumentText(event.target.value);
    };

    const handleClearSummaryClick = () => {
        setDocumentText('');
    };

    const handleCancelClick = () => {
        navigate(`/ui/summary/${document.celex}/view`)
    };

    return (<Container>
        <Container>
            <Row className="justify-content-between" style={{marginBottom: '5px'}}>
                <Col xs="auto">
                    <Button variant="danger" onClick={handleClearSummaryClick}>Clear Summary</Button>
                </Col>
                <Col xs="auto">
                    <div className="d-flex gap-2">
                        <Button variant="danger" onClick={handleCancelClick}>Cancel</Button>
                        <Button variant="success">Save</Button>
                    </div>
                </Col>
            </Row>
        </Container>
        <Container fluid="md">
            <Row>
                <Card>
                    <Card.Body>
                        <Form.Control
                            as="textarea"
                            rows={25}
                            value={documentText}
                            onChange={handleTextChange}
                        />
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    </Container>);
}

export default NewDocumentComponent;