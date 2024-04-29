import React, {useState} from 'react';
import TableHeader from './TableHeader';
import TableItem from './TableItem';
import Filter from "./FilterComponent";
import {useNavigate} from "react-router-dom";
import FiltersContainer from "../CategoryAndSubCategoryFiltersComponent";
import {TopicFilters} from "../enums";

const tableStyles = {
    width: '100%',
    flexDirection: 'column',
};

const Table = ({data, selectedCategory, setSelectedCategory, categoryFilter, setCategoryFilter, subCategoryFilter, setSubCategoryFilter}) => {
    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = useState('');

    const filteredData = data?.filter(item => {
        return (filterQuery === '' || item.status === filterQuery) && item.title !== '';
    }) || [];

    return (
        <div>
            <div className="d-flex justify-content-end mb-3">
                <FiltersContainer categories={TopicFilters} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categoryFilter={categoryFilter}
                                  setCategoryFilter={setCategoryFilter} subCategoryFilter={subCategoryFilter}
                                  setSubCategoryFilter={setSubCategoryFilter}/>
                <Filter onFilterChange={setFilterQuery}/>
            </div>
            <div style={tableStyles}>
                <TableHeader/>
                {data !== undefined && data !== null && filteredData.map((item, index) => (
                    <TableItem
                        key={index}
                        celex={item.celexNumber}
                        title={item.title}
                        owner={item.owner}
                        lastUpdated={item.current.timestamp}
                        status={item.status}
                        viewItemClick={() => navigate(`/summary/${item.celexNumber}/view`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Table;