import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import Table from "./SummariesTableComponents/TableComponent";

function SummariesComponent() {
    const [summaryList, setSummaryList] = useState();

    useEffect(() => {
        const fetchSummaryList = async () => {
            let allData = [];
            let pageIndex = 0;
            let hasMoreData = true;

            try {
                while (hasMoreData) {
                    const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/fetchAll/${pageIndex}`);

                    if (!response.ok) {
                        throw new Error(`Status: ${response.status}`);
                    }

                    const data = await response.json();

                    if (data.length === 0) {
                        hasMoreData = false;
                    } else {
                        allData = allData.concat(data);
                        pageIndex++;
                    }
                }

                setSummaryList(allData);
            } catch (error) {
                console.error("Could not fetch summary", error);
            }
        };

        fetchSummaryList();
    }, [])

    return (
        <Container>
            <Container>
                <Table data={summaryList}/>
            </Container>
        </Container>
    );
}

export default SummariesComponent;