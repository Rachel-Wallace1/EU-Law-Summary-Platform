import React, {useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import {MdFilterList} from "react-icons/md";

const toggleStyles = {
    color: 'black',
    backgroundColor: '#FFFFFF',
    borderWidth: '2px',
    borderColor: '#eee',
};

const Filter = ({onFilterChange}) => {
    const [currentFilter, setCurrentFiler] = useState('Status');

    const updateFilter = (filter) => {
        filter !== '' ? setCurrentFiler(filter) : setCurrentFiler("Status")
        onFilterChange(filter)
    }

    return (
        <div className="d-flex justify-content-end mb-3">
            <Dropdown>
                <Dropdown.Toggle style={toggleStyles} id="dropdown-filter">
                    <MdFilterList size={'22px'}/> {currentFilter}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => updateFilter('New')}>New</Dropdown.Item>
                    <Dropdown.Item onClick={() => updateFilter('Revised')}>Revised</Dropdown.Item>
                    <Dropdown.Item onClick={() => updateFilter('Pending Approval')}>Pending Approval</Dropdown.Item>
                    <Dropdown.Item onClick={() => updateFilter('Published')}>Published</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item onClick={() => updateFilter('')}>All Statuses</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default Filter;