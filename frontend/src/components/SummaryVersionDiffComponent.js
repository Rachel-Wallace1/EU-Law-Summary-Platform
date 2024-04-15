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

const expertNotes = 'Lorem ipsum is simply dummy text of the printing and typesetting industry...';

function SummaryVersionDiffComponent({celex, currentVersion, previousVersion}) {
    const [current, setCurrent] = useState();
    const [previous, setPrevious] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndSetSummary = async () => {
            try {
                const prevResponse = await fetchSummaryVersion(celex, previousVersion);
                const currResponse = await fetchSummaryVersion(celex, currentVersion);
                setPrevious(prevResponse);
                setCurrent(currResponse);
                setLoading(false);
            } catch (error) {
                console.error("Could not fetch summary by celex and version: ", error);
            }
        };

        fetchAndSetSummary();
    }, []);

    return (
        <Container>
            <Container fluid="md">
                <Row>
                    <Col md={2}>
                        {!loading && <Card>
                            <Card.Header><b>Revision Details</b></Card.Header>
                            <Card.Body>
                                <Card.Text style={{fontSize: '0.8rem'}}>
                                    <b>Owner:</b> {current.author}
                                </Card.Text>
                                <Card.Text style={{fontSize: '0.8rem'}}>
                                    <b>Current Revision:</b> v{currentVersion}
                                </Card.Text>
                                <Card.Text style={{fontSize: '0.8rem'}}>
                                    <b>Timestamp:</b> {current.timestamp}
                                </Card.Text>
                            </Card.Body>
                        </Card>}
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
                         {!loading && <Card>
                            <Card.Body>
                                <Card.Text>
                                    <DiffComponent newText={current.summary}
                                                   oldText={previous.summary}/>
                                </Card.Text>
                            </Card.Body>
                        </Card>}
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default SummaryVersionDiffComponent;