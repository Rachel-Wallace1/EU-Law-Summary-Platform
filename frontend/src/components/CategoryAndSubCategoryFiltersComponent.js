import React, {useEffect, useState} from 'react';
import { Dropdown } from 'react-bootstrap';
import { MdFilterList } from "react-icons/md";

const toggleStyles = {
    color: 'black',
    backgroundColor: '#FFFFFF',
    borderWidth: '2px',
    borderColor: '#eee',
};

// CategoryFilter component used for rendering a dropdown to choose from categories
const CategoryFilter = ({ categories, selectedCategory, categoryFilter, onCategoryChange }) => {
    const [currentCategory, setCurrentCategory] = useState(categoryFilter || 'Select Category'); // getter and setter for currentCategory, default value categoryFilter or "Select Category"

    // if selectedCategory changes, find the selected category and set the current category and call onCategoryChange
    useEffect(() => {
        const currentCategoryObject = categories.find(category => category.filter === selectedCategory);
        if (currentCategoryObject) {
            setCurrentCategory(currentCategoryObject.name);
            onCategoryChange(currentCategoryObject);
        }
    }, [selectedCategory])

    // onCategoryUpdate, set current category name and call onCategoryChange
    const updateCategory = (category) => {
        setCurrentCategory(category.name);
        onCategoryChange(category);
    };

    return (
        <div className="d-flex justify-content-end mb-3">
            <Dropdown>
                <Dropdown.Toggle style={toggleStyles} id="dropdown-category">
                    <MdFilterList size={'22px'} /> {currentCategory}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {/* iterate over categories, to list the dropdown items */}
                    {categories.map((category) => (
                        <Dropdown.Item key={category.filter} onClick={() => updateCategory(category)}> {/* onClick, update category */}
                            {category.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

// SubCategory Filter component used for rendering a dropdown to choose from subcategories
const SubcategoryFilter = ({ subcategories, onSubcategoryChange }) => {
    const [currentSubcategory, setCurrentSubcategory] = useState('Select Subcategory'); // getter and setter for current subcategory, default "SelectCategory"

    // onSubcategoryChange, update current subcategory and call onSubcategoryChange
    const updateSubcategory = (subcategory) => {
        setCurrentSubcategory(subcategory);
        onSubcategoryChange(subcategory);
    };

    return (
        <div className="d-flex justify-content-end mb-3">
            <Dropdown>
                <Dropdown.Toggle style={toggleStyles} id="dropdown-subcategory">
                    <MdFilterList size={'22px'} /> {currentSubcategory}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {/* iterate over subcategories list out dropdown items */}
                    {subcategories.map((sub) => (
                        <Dropdown.Item key={sub} onClick={() => updateSubcategory(sub)}> {/* onClick call updateSubCategory */}
                            {sub.replace(/-/g, ' ').replace(/\(.*?\)/g, '')}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

const FiltersContainer = ({ categories, selectedCategory, setSelectedCategory, categoryFilter, setCategoryFilter, setSubCategoryFilter }) => {
    const [subcategories, setSubcategories] = useState([]); // getter and setter for the subCategory

    // onCategoryChange, set selected category and subcategory
    const handleCategoryChange = (category) => {
        setCategoryFilter(category);
        setSelectedCategory(category.filter)
        setSubcategories(category.subcategories || []);
    };

    // onSubcategoryChange, set the subcategory filter
    const handleSubCategoryChange = (subcategory) => {
        setSubCategoryFilter(subcategory);
    };

    return (
        <>
            <div style={{ marginRight: '10px' }}>
                {/* Category Filter Component */}
                <CategoryFilter categories={categories} selectedCategory={selectedCategory} categoryFilter={categoryFilter} onCategoryChange={(category) => handleCategoryChange(category)} />
            </div>
            <div style={{ marginRight: '10px' }}>
                {/* Sub Category Filter Component */}
                {categoryFilter && <SubcategoryFilter subcategories={subcategories} onSubcategoryChange={(subcategory) => handleSubCategoryChange(subcategory)} />}
            </div>
        </>
    );
};

export default FiltersContainer;
