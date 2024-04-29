import React, {useEffect, useState} from 'react';
import { Dropdown } from 'react-bootstrap';
import { MdFilterList } from "react-icons/md";

const toggleStyles = {
    color: 'black',
    backgroundColor: '#FFFFFF',
    borderWidth: '2px',
    borderColor: '#eee',
};

const CategoryFilter = ({ categories, selectedCategory, categoryFilter, onCategoryChange }) => {
    const [currentCategory, setCurrentCategory] = useState(categoryFilter || 'Select Category');

    useEffect(() => {
        const currentCategoryObject = categories.find(category => category.filter === selectedCategory);
        if (currentCategoryObject) {
            setCurrentCategory(currentCategoryObject.name);
            onCategoryChange(currentCategoryObject);
        }
    }, [selectedCategory])

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
                    {categories.map((category) => (
                        <Dropdown.Item key={category.filter} onClick={() => updateCategory(category)}>
                            {category.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

const SubcategoryFilter = ({ subcategories, onSubcategoryChange }) => {
    const [currentSubcategory, setCurrentSubcategory] = useState('Select Subcategory');

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
                    {subcategories.map((sub) => (
                        <Dropdown.Item key={sub} onClick={() => updateSubcategory(sub)}>
                            {sub.replace(/-/g, ' ').replace(/\(.*?\)/g, '')}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

const FiltersContainer = ({ categories, selectedCategory, setSelectedCategory, categoryFilter, setCategoryFilter, setSubCategoryFilter }) => {
    const [subcategories, setSubcategories] = useState([]);

    const handleCategoryChange = (category) => {
        setCategoryFilter(category);
        setSelectedCategory(category.filter)
        setSubcategories(category.subcategories || []);
    };

    const handleSubCategoryChange = (subcategory) => {
        setSubCategoryFilter(subcategory);
    };

    return (
        <>
            <div style={{ marginRight: '10px' }}>
                <CategoryFilter categories={categories} selectedCategory={selectedCategory} categoryFilter={categoryFilter} onCategoryChange={(category) => handleCategoryChange(category)} />
            </div>
            <div style={{ marginRight: '10px' }}>
                {categoryFilter && <SubcategoryFilter subcategories={subcategories} onSubcategoryChange={(subcategory) => handleSubCategoryChange(subcategory)} />}
            </div>
        </>
    );
};

export default FiltersContainer;
