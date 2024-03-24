import React, {useState} from 'react';
import TableHeader from './TableHeader';
import TableItem from './TableItem';
import Filter from "./FilterComponent";
import {useNavigate} from "react-router-dom";

const tableStyles = {
    width: '100%',
    flexDirection: 'column',
};

const Table = ({data}) => {
    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = useState('');

    const filteredData = data.filter(item => {
        return filterQuery === '' || item.status === filterQuery;
    });

    return (
        <div>
            <Filter onFilterChange={setFilterQuery}/>
            <div style={tableStyles}>
                <TableHeader/>
                {filteredData.map((item, index) => (
                    <TableItem
                        key={index}
                        celex={item.celex}
                        title={item.title}
                        owner={item.owner}
                        lastUpdated={item.lastUpdated}
                        status={item.status}
                        viewItemClick={() => navigate(`/summary/${item.celex}/view`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Table;