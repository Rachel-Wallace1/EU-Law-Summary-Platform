import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import Table from "./SummariesTableComponents/TableComponent";

function SummariesComponent({category}) {
    const [summaryList, setSummaryList] = useState();
    const [selectedCategory, setSelectedCategory] = useState(category || '');
    const [categoryFilter, setCategoryFilter] = useState();
    const [subCategoryFilter, setSubCategoryFilter] = useState('');

    useEffect(() => {
        const fetchSummaryList = async () => {
            let allData = [];
            let pageIndex = 0;
            let hasMoreData = true;

            try {
                while (hasMoreData) {
                    let query = ""
                    query += `page=${pageIndex}`
                    if (selectedCategory && selectedCategory !== "") {
                        query += `&category=${selectedCategory}`
                    }
                    if (selectedCategory && selectedCategory !== "" && subCategoryFilter && subCategoryFilter !== "") {
                        query += `&subcategory=${subCategoryFilter}`
                    }
                    const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/fetchAll?${query}`);

                    if (!response.ok) {
                        throw new Error(`Status: ${response.status}`);
                    }

                    const data = await response.json();

                    if (data.length === 0) {
                        hasMoreData = false;
                    } else {
                        allData = allData.concat(data);
                        pageIndex++;
                    }
                }

                setSummaryList(allData);
            } catch (error) {
                console.error("Could not fetch summary", error);
            }
        };

        fetchSummaryList();
    }, [selectedCategory, subCategoryFilter])

    return (
        <Container>
            <Container>
                <Table data={summaryList} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categoryFilter={categoryFilter}
                       setCategoryFilter={setCategoryFilter} subCategoryFilter={subCategoryFilter}
                       setSubCategoryFilter={setSubCategoryFilter}/>
            </Container>
        </Container>
    );
}

export default SummariesComponent;