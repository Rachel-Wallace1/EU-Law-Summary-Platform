import React, {useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import {MdFilterList} from "react-icons/md";

const toggleStyles = {
    color: 'black',
    backgroundColor: '#FFFFFF',
    borderWidth: '2px',
    borderColor: '#eee',
};

// Summary Status Filter component for rendering a dropdown for summary statuses
const Filter = ({onFilterChange}) => {
    const [currentFilter, setCurrentFiler] = useState('Status'); // getter and setter for currentFilter, default "Status"

    // onUpdatedFilter, if filter not equal to empty string then setCurrentFilter to filter or set it to default status and call onFilterChange
    const updateFilter = (filter) => {
        filter !== '' ? setCurrentFiler(filter) : setCurrentFiler("Status")
        onFilterChange(filter)
    }

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle style={toggleStyles} id="dropdown-filter">
                    <MdFilterList size={'22px'}/> {currentFilter}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => updateFilter('New')}>New</Dropdown.Item> {/* onClick update filter with "New" status */}
                    <Dropdown.Item onClick={() => updateFilter('Revised')}>Revised</Dropdown.Item> {/* onClick update filter with "Revised" status */}
                    <Dropdown.Item onClick={() => updateFilter('Pending Approval')}>Pending Approval</Dropdown.Item> {/* onClick update filter with "Pending Approval" status */}
                    <Dropdown.Item onClick={() => updateFilter('Published')}>Published</Dropdown.Item> {/* onClick update filter with "Published" status */}
                    <Dropdown.Divider/>
                    <Dropdown.Item onClick={() => updateFilter('')}>All Statuses</Dropdown.Item> {/* onClick update filter with empty string status */}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

export default Filter;