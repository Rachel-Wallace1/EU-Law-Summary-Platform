import React, {useState} from 'react';
import TableHeader from './TableHeader';
import TableItem from './TableItem';
import {useNavigate} from "react-router-dom";

const tableStyles = {
    width: '100%',
    flexDirection: 'column',
};

// SummaryTimelineTable table for summary version timeline
const SummaryTimelineTable = ({celex, data}) => {
    const navigate = useNavigate();

    return (
        <div>
            <div style={tableStyles}>
                <TableHeader/>
                {data !== undefined && data !== null && data.map((item, index) => (
                    <TableItem
                        key={index}
                        celex={celex}
                        version={item.v}
                        owner={item.author}
                        updateDate={item.timestamp}
                        viewDiffClick={() => navigate(`/summary/${celex}/diff?current=${Number(item.v)}&previous=${Number(item.v) - 1}`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SummaryTimelineTable;