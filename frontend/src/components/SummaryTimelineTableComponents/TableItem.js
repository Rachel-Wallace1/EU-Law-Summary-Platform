import React from 'react';
import { Button } from "react-bootstrap";

const rowStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px 0',
    padding: '10px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const itemStyles = {
    flex: 1,
    padding: '0 15px',
    textAlign: 'center',
};

const TableItem = ({ celex, version, owner, updateDate, viewDiffClick }) => {
    return (
        <div style={rowStyles}>
            <div style={itemStyles}>{celex}</div>
            <div style={itemStyles}>{version}</div>
            <div style={itemStyles}>{owner}</div>
            <div style={itemStyles}>{updateDate}</div>
            <div style={itemStyles}>
                <Button variant="primary" onClick={viewDiffClick}>View</Button>
            </div>
        </div>
    );
};

export default TableItem;