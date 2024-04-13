import React from 'react';

const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    color: '#333',
    fontWeight: 'bold',
    borderBottom: '2px solid #eee',
    marginBottom: '20px',
};

const headerItemStyles = {
    flex: 1,
    padding: '0 15px',
    textAlign: 'center',
};

const TableHeader = () => {
    return (
        <div style={headerStyles}>
            <div style={headerItemStyles}>Celex</div>
            <div style={headerItemStyles}>Version</div>
            <div style={headerItemStyles}>Owner</div>
            <div style={headerItemStyles}>Update Date</div>
            <div style={headerItemStyles}>Revision</div>
        </div>
    );
};

export default TableHeader;