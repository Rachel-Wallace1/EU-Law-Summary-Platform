import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import SummaryTimelineTable from "./SummaryTimelineTableComponents/TableComponent";

// TODO to integrate to backend: remove
const mockData = {
    "celexNumber": "law127",
    "count": 4,
    "versions": [
        {
            "v": 4,
            "author": "adam",
            "timestamp": "04/13/2024, 01:42:25"
        },
        {
            "v": 3,
            "author": "adam",
            "timestamp": "04/13/2024, 00:45:36"
        },
        {
            "v": 2,
            "author": "adam",
            "timestamp": "04/13/2024, 00:45:10"
        },
        {
            "v": 1,
            "author": "LegalBot",
            "timestamp": "04/13/2024, 00:44:48"
        }
    ]
}
function SummaryTimelineComponent({celex}) {
    const [timelineList, setTimelineList] = useState();

    useEffect(() => {
        // TODO to integrate to backend: uncomment
        // const fetchTimeline = async () => {
        //
        //     try {
        //         const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/summary/${celex}/versions`);
        //
        //         if (!response.ok) {
        //             throw new Error(`Status: ${response.status}`);
        //         }
        //
        //         const data = await response.json();
        //
        //         setTimelineList(data);
        //     } catch (error) {
        //         console.error("Could not fetch summary", error);
        //     }
        // };
        //
        // fetchTimeline();

        // TODO to integrate to backend: change param to data and not mockData
        setTimelineList(mockData.versions)
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