import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import SummaryTimelineTable from "./SummaryTimelineTableComponents/TableComponent";

function SummaryTimelineComponent({celex}) {
    const [timelineList, setTimelineList] = useState();

    useEffect(() => {
        const fetchTimeline = async () => {

            try {
                const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/summary/${celex}/versions`);

                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`);
                }

                const data = await response.json();

                setTimelineList(data.versions);
            } catch (error) {
                console.error("Could not fetch summary", error);
            }
        };

        fetchTimeline();

    }, [])

    return (
        <Container>
            <Container>
                <SummaryTimelineTable celex={celex} data={timelineList}/>
            </Container>
        </Container>
    );
}

export default SummaryTimelineComponent;