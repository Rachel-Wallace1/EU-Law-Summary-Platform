import React from 'react';
import {Container} from 'react-bootstrap';
import Table from "./SummariesTableComponents/TableComponent";

const mockData = [
    {
        celex: '00102',
        title: 'Mollit anim commodo',
        owner: 'AI Edited',
        lastUpdated: '06-04-2022',
        status: 'New',
    },
    {
        celex: '00103',
        title: 'Lorem ipsum',
        owner: 'Internal User edited',
        lastUpdated: '07-04-2022',
        status: 'New',
    },
    {
        celex: '00104',
        title: 'Voila',
        owner: 'AI Edited',
        lastUpdated: '08-04-2022',
        status: 'New',
    },
    {
        celex: '00424',
        title: 'Dolore laboris sunt',
        owner: 'Expert Edited',
        lastUpdated: '12-06-2022',
        status: 'Revised',
    },
    {
        celex: '00430',
        title: 'Et adipiscing',
        owner: 'Expert Edited',
        lastUpdated: '03-09-2022',
        status: 'Pending Approval',
    },
    {
        celex: '00989',
        title: 'Mollit anim Aliquip commodo',
        owner: 'AI Edited',
        lastUpdated: '10-06-2022',
        status: 'Published',
    },
];

function SummariesComponent() {
    return (
        <Container>
            <Container>
                <Table data={mockData} />
            </Container>
        </Container>
    );
}

export default SummariesComponent;