import React, {useEffect, useState} from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap';
import {diffWordsWithSpace} from 'diff';

function inlineDiffToHTML(oldText, newText) {
    const diffResult = diffWordsWithSpace(oldText, newText);
    return diffResult.map((part) => {
        const value = part.value.replace(/\n/g, '<br>');
        if (part.added) {
            return `<ins style="color:forestgreen;">${value}</ins>`;
        } else if (part.removed) {
            return `<del style="color:red;text-decoration:line-through;text-decoration-color:red;">${value}</del>`;
        } else {
            return value;
        }
    }).join('');
}

function DiffComponent({oldText, newText}) {
    if (newText === '') {
        return (
            <div>No version comparison available</div>
        )
    }

    if (oldText !== '') {
        const diffHTML = inlineDiffToHTML(oldText, newText);
        return (
            <div dangerouslySetInnerHTML={{__html: diffHTML}}/>
        );
    } else {
        const diffHTML = inlineDiffToHTML('', newText);
        return (
            <div dangerouslySetInnerHTML={{__html: diffHTML}}/>
        );
    }
}

const fetchSummaryVersion = async (celex, version) => {
    try {
        const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/summary/${celex}/version/${version}`);
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error("Could not fetch summary by celex and version: ", error);
    }
};

// TODO integrating with backend: remove
const mockPreviousText = {
    summary: 'SUMMARY OF:\n' +
        'Regulation (EU) No 1308/2013 — common organisation of the markets in agricultural products\n' +
        '\n' +
        'WHAT IS THE AIM OF THE REGULATION?\n' +
        'It aims at stabilising markets and preventing market crises from escalating by providing a safety net to agricultural markets through the use of market intervention tools (public intervention* and private storage aid) and exceptional measures. It also provides for the necessary market transparency measures to allow agricultural producers to better make their production and investment decisions in view of market developments.\n' +
        'It aims at improving productivity and quality at the production level, boosting demand and helping EU agricultural sectors to better adapt to market changes and increase their competitiveness through aid to specific sectors (particularly fruit and vegetables, and wine).\n' +
        'It seeks to encourage cooperation within the food supply chain through producer organisations* and interbranch organisations* (organisations that represent actors of the food supply chain involved in the production of, trade in and/or processing of products in specific sectors).\n' +
        'It lays down minimum quality requirements (marketing standards), rules and conditions to ensure the quality of the production process and of the products. It specifies the rules for the use of optional reserved terms for value-adding product features or production processes for a number of products. It also sets out rules on trade in agricultural products and specific rules on competition.\n' +
        'The regulation has been amended on a number of occasions, most recently by Regulation (EU) 2020/2220, which introduces transitional rules for the common agricultural policy (CAP) covering the 2021-2022 period.\n\n' +
        'KEY POINTS\n' +
        'The main rules set out in the regulation are divided into several parts. The European Commission is granted the power to adopt additional delegated and implementing acts to further elaborate upon these rules.\n' +
        '...\n' +
        'RELATED DOCUMENTS',
    owner: 'Rachel Wallace',
    timestamp: '04/13/2024, 00:44:48'
}

// TODO integrating with backend: remove
const mockCurrentText = {
    summary: 'SUMMARY OF:\n' +
        'Regulation (EU) No 1308/2013 — common organization of the markets in agricultural products\n' +
        '\n' +
        'WHAT IS THE AIM OF THE REGULATION?\n' +
        'It aims at stabilizing markets and preventing market crises from escalating by providing a safety net to agricultural markets through the use of market intervention tools (public intervention* and private storage aid) and exceptional measures. It also provides for the necessary market transparency measures to allow agricultural producers to better make their production and investment decisions in view of market developments.\n' +
        'It aims at improving productivity and quality at the production level, boosting demand and helping EU agricultural sectors to better adapt to market changes and increase their competitiveness through aid to specific sectors (particularly fruit and vegetables, and wine).\n' +
        'It seeks to encourage food supply producers to closely communicate with government\n' +
        'It seeks to encourage cooperation within the food supply chain through producer organisations* and interbranch organisations* (organisations that represent actors of the food supply chain involved in the production of, trade in and/or processing of products in specific sectors).\n' +
        'It specifies the rules for the use of optional reserved terms for value-adding product features or production processes for a number of products. It also sets out rules on trade in agricultural products and specific rules on competition.\n\n' +
        'KEY POINTS\n' +
        'The main rules set out in the regulation are divided into several parts. The European Commission is granted the power to adopt additional delegated and implementing acts to further elaborate upon these rules.\n' +
        '...\n' +
        'RELATED DOCUMENTS',
    owner: 'Rachel Wallace',
    timestamp: '04/13/2024, 00:44:48'
}

const expertNotes = 'Lorem ipsum is simply dummy text of the printing and typesetting industry...';

function SummaryVersionDiffComponent({celex, currentVersion, previousVersion}) {
    const [current, setCurrent] = useState(mockCurrentText); // TODO integrating with backend: remove the 'mockCurrentText' and leave empty
    const [previous, setPrevious] = useState(mockPreviousText); // TODO integrating with backend: remove the 'mockPreviousText' and leave empty

    useEffect(() => {
        // TODO integrating with backend: uncomment this code to call the fetch summary function and update state
        // const fetchAndSetSummary = async () => {
        //     try {
        //         const prevResponse = await fetchSummaryVersion(celex, previousVersion);
        //         const currResponse = await fetchSummaryVersion(celex, currentVersion);
        //
        //         setPrevious(prevResponse);
        //         setCurrent(currResponse);
        //     } catch (error) {
        //         console.error("Could not fetch summary by celex and version: ", error);
        //     }
        // };
        //
        // fetchAndSetSummary();
    }, []);

    return (
        <Container>
            <Container fluid="md">
                <Row>
                    <Col md={2}>
                        <Card>
                            <Card.Header><b>Revision Details</b></Card.Header>
                            <Card.Body>
                                <Card.Text style={{fontSize: '0.8rem'}}>
                                    <b>Owner:</b> {current.owner}
                                </Card.Text>
                                <Card.Text style={{fontSize: '0.8rem'}}>
                                    <b>Current Revision:</b> v{currentVersion}
                                </Card.Text>
                                <Card.Text style={{fontSize: '0.8rem'}}>
                                    <b>Timestamp:</b> {current.timestamp}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Card>
                            <Card.Header><b>Legal Expert Notes</b></Card.Header>
                            <Card.Body>
                                <Card.Text style={{fontSize: '1rem'}}>
                                    {expertNotes}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={10}>
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    <DiffComponent newText={current.summary}
                                                   oldText={previous.summary}/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default SummaryVersionDiffComponent;