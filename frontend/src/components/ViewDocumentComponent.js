import React from 'react';
import {Card, Container, Row, Col, Button, Modal, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import DOMPurify from 'dompurify';

const document = {
    celex: '12345',
    title: "The common organization of agricultural markets in the EU",
    summary: '<div id="document1"> <div lang=""> <p class="ti-main">Agricultural and food supply chain — unfair business-to-business trading practices</p> <p class="normal"> &nbsp; </p> <p class="ti-chapter"> SUMMARY OF: </p> <p class="normal"> <a href="./../../../legal-content/EN/AUTO/?uri=celex:32019L0633">Directive (EU) 2019/633 on unfair trading practices in business-to-business relationships in the agricultural and food supply chain</a> </p> <p class="ti-chapter"> WHAT IS THE AIM OF THE DIRECTIVE? </p> <ul class="disc"> <li> It sets out a minimum list of <span class="bold">prohibited unfair trading practices</span> between buyers and suppliers in the agricultural and food supply chain and lays down minimum enforcement rules. </li> <li> It aims to stop larger businesses exploiting small and medium-sized suppliers because of their weaker bargaining position, and to avoid the costs of such practices being passed on to primary producers. </li> </ul> <p class="ti-chapter"> KEY POINTS </p> <p class="normal">The rules protect small and medium-sized suppliers, as well as larger suppliers with an annual turnover not exceeding €350 million. The protection depends on the relative size of the supplier and the buyer in terms of annual turnover. These suppliers are divided into 5 sub-categories by turnover:</p> <ul class="disc"> <li> up to €2 million; </li> <li> €2-10 million; </li> <li> €10-50 million; </li> <li> €50-150 million; and </li> <li> €150-350 million. </li> </ul> <p class="normal"> <span class="bold">Prohibition of unfair trading practices</span> </p> <p class="normal">The directive prohibits the following <span class="bold">unfair trading practices</span> in any circumstances:</p> <ul class="disc"> <li> <a href="http://eur-lex.europa.eu/legal-content/EN/TXT/?uri=LEGISSUM:mi0074">payment</a> later than 30 days for perishable agricultural and food products; </li> <li> payment later than 60 days for other agricultural and food products; </li> <li> short-notice cancellations of perishable agricultural and food products; </li> <li> unilateral changes to the terms of the supply agreement by the buyer; </li> <li> payments requested by the buyer that are not related to the sale of an agricultural and food product; </li> <li> payments requested by the buyer for the deterioration or loss of agricultural and food products where such deterioration or loss is not caused by the negligence or fault of the supplier; </li> <li> refusal by the buyer to provide a written confirmation of a supply agreement, despite the supplier’s request; </li> <li> misuse of the supplier’s trade secrets by the buyer; </li> <li> commercial retaliation actions by the buyer against the supplier if the supplier exercises their contractual or legal rights; </li> <li> transferring costs for examining customer complaints to the supplier’s products despite the absence of negligence or fault on the part of the supplier. </li> </ul> <p class="normal">The directive prohibits the following <span class="bold">unfair trading practices</span> unless the supplier and the buyer <span class="bold">have agreed to it</span> in clear and unambiguous terms:</p> <ul class="disc"> <li> the buyer returns unsold agricultural and food products to the supplier without paying for those unsold products or without paying for the disposal of those products, or both; </li> <li> the supplier is charged payment as a condition for stocking, displaying or listing its agricultural and food products, or of making such products available on the market; </li> <li> the buyer asks the supplier to pay for discounts on agricultural and food products sold by the buyer as part of a promotion; </li> <li> the buyer asks the supplier to pay for the advertising or marketing by the buyer of agricultural and food products; </li> <li> the buyer charges the supplier for staff for fitting out premises used for the sale of the supplier’s products. </li> </ul> <p class="normal"> <span class="bold">Complaints and confidentiality</span> </p> <p class="normal">EU countries designate <span class="bold">national enforcement authorities</span>. Suppliers can complain to the enforcement authority of their own country or the country of the buyer suspected of a prohibited trading practice.</p> <p class="normal">If asked, the enforcement authority must take the necessary measures to protect the identity of the complainant and of any other information considered harmful to the interests of the complainant or suppliers.</p> <p class="normal"> <span class="bold">Powers of the competent authorities</span> </p> <p class="normal">Enforcement authorities must have the powers and expertise to:</p> <ul class="disc"> <li> initiate and carry out investigations; </li> <li> require information from buyers and suppliers; </li> <li> carry out unannounced on-site inspections; </li> <li> order that a prohibited practice cease, where appropriate; </li> <li> impose or initiate proceedings for the imposition of fines and other penalties and interim measures against the business which committed the infringement; </li> <li> publish decisions. </li> </ul> <p class="normal">EU countries may promote effective alternative voluntary dispute resolution mechanisms.</p> <p class="normal">EU countries must ensure that enforcement authorities cooperate effectively with each other and with the Commission and assist each other in cases with a cross-border dimension.</p> <p class="normal">The <a href="http://eur-lex.europa.eu/summary/glossary/european_commission.html">European Commission</a> is assisted by the <a href="http://ec.europa.eu/agriculture/committees/cmo_en">Committee for the Common Organisation of the Agricultural Markets</a> set up under Regulation (EU) No 1308/2013 (see summary <a href="http://eur-lex.europa.eu/legal-content/EN/TXT/?uri=LEGISSUM:0302_1">The common organisation of agricultural markets in the EU</a>).</p> <p class="ti-chapter"> FROM WHEN DOES THE DIRECTIVE APPLY? </p> <p class="normal">It has to become law in the EU countries by 1 May 2021. EU countries have to apply the measures by 1 November 2021.</p> <p class="ti-chapter"> BACKGROUND </p> <p class="normal">See also:</p> <ul class="disc"> <li> <a href="http://ec.europa.eu/info/sites/info/files/food-farming-fisheries/key_policies/documents/brochure-utp-directive_en.pdf">The Directive on unfair trading practices in the agricultural and food supply chain</a> (<span class="italic">European Commission</span>). </li> </ul> <p class="ti-chapter"> MAIN DOCUMENT </p> <p class="normal">Directive (EU) <a href="./../../../legal-content/EN/AUTO/?uri=celex:32019L0633">2019/633</a> of the European Parliament and of the Council of 17 April 2019 on unfair trading practices in business-to-business relationships in the agricultural and food supply chain (OJ L 111, 25.4.2019, pp. 59-72)</p> <p class="ti-chapter"> RELATED DOCUMENTS </p> <p class="normal">Directive (EU) <a href="./../../../legal-content/EN/AUTO/?uri=celex:32016L0943">2016/943</a> of the European Parliament and of the Council of 8 June 2016 on the protection of undisclosed know-how and business information (trade secrets) against their unlawful acquisition, use and disclosure (OJ L 157, 15.6.2016, pp. 1-18)</p> <p class="normal">Regulation (EU) No <a href="./../../../legal-content/EN/AUTO/?uri=celex:32013R1308">1308/2013</a> of the European Parliament and of the Council of 17 December 2013 establishing a common organisation of the markets in agricultural products and repealing Council Regulations (EEC) No 922/72, (EEC) No 234/79, (EC) No 1037/2001 and (EC) No 1234/2007 (OJ L 347, 20.12.2013, pp. 671-854)</p> <p class="normal">Successive amendments to Regulation (EU) No 1308/2013 have been incorporated into the original text. This <a href="./../../../legal-content/EN/AUTO/?uri=celex:02013R1308-20190101">consolidated version</a> is of documentary value only.</p> <p class="normal">Directive <a href="./../../../legal-content/EN/AUTO/?uri=celex:32011L0007">2011/7/EU</a> of the European Parliament and of the Council of 16 February 2011 on combating late payment in commercial transactions (OJ L 48, 23.2.2011, pp. 1-10)</p> <p class="lastmod">last update 29.08.2019</p></div> <a href="#document1">Top<i class="fa fa-angle-right" aria-hidden="true">&nbsp;</i> </a> </div>',
    status: "pending_review" // change this to publish and actionable buttons will be removed
};

function GenerateSummaryModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Generate Summary
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div key={`llm-model-radio`} className="mb-3">
                    <Form.Check
                        inline
                        label="gpt4 LLM model"
                        name="llm-radio"
                        type='radio'
                        id={`inline-radio-1`}
                    />
                    <Form.Check
                        inline
                        label="2nd LLM model"
                        name="llm-radio"
                        type='radio'
                        id={`inline-radio-2`}
                    />
                </div>
                <Form.Label htmlFor="celexId">Celex Number</Form.Label>
                <Form.Control
                    type="text"
                    id="celexId"
                    value={document.celex}
                    disabled={true}
                    aria-describedby="passwordHelpBlock"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={props.generateSummaryClick}>Generate Summary</Button>
            </Modal.Footer>
        </Modal>
    );
}

function ViewDocumentComponent() {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = React.useState(false);
    const formattedSummary = DOMPurify.sanitize(document.summary); // sanitizes to render proper HTML

    const handleEditClick = () => {
        navigate(`/summary/${document.celex}/edit`, {state: {document}})
    }

    const handleGenerateSummaryClick = () => {
        navigate(`/summary/${document.celex}/new`, {state: {document}})
    }

    return (
        <Container>
            {document.status !== "published" && <Container>
                <Row className="justify-content-between" style={{marginBottom: '5px'}}>
                    <Col xs="auto">
                        <Button variant="primary">Timeline</Button>
                    </Col>
                    <Col xs="auto">
                        <div className="d-flex gap-2">
                            <Button variant="primary" onClick={() => setModalShow(true)}>
                                New Summary
                            </Button>
                            <GenerateSummaryModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                generateSummaryClick={handleGenerateSummaryClick}
                            />
                            <Button variant="warning" onClick={handleEditClick}>Edit</Button>
                            <Button variant="success">Send</Button>
                        </div>
                    </Col>
                </Row>
            </Container>}
            <Container fluid="md">
                <Row>
                    <Card>
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}><strong>{document.title}</strong></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"><strong>SUMMARY OF:</strong></Card.Subtitle>
                            <Card.Text>
                                <div dangerouslySetInnerHTML={{__html: formattedSummary}}></div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </Container>
    );
}

export default ViewDocumentComponent;