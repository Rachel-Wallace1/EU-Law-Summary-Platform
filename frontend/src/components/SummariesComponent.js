import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import Table from "./SummariesTableComponents/TableComponent";

function SummariesComponent({category}) {
    const [summaryList, setSummaryList] = useState(); // local state for getter and setter for summaryList
    const [selectedCategory, setSelectedCategory] = useState(category || ''); // local state for getter and setter for selectedCategory
    const [categoryFilter, setCategoryFilter] = useState(); // local state for getter and setter for categoryFilter
    const [subCategoryFilter, setSubCategoryFilter] = useState(''); // local state for getter and setter for subCategoryFilter

    useEffect(() => {
        // fetch summaries by iterating over ALL pages in backend /api/fetchAll until no more data
        const fetchSummaryList = async () => {
            let allData = []; // summaries array
            let pageIndex = 0; // page index
            let hasMoreData = true; // while loop conditional

            try {
                // while there is still data in backend /api/fetchAll call, continue
                while (hasMoreData) {
                    // build the /api/fetchAll?{query} query part
                    let query = ""

                    // get the current page index and append page index to query string
                    query += `page=${pageIndex}` // e.g. page=1

                    // if current selected category, append category to the query string
                    if (selectedCategory && selectedCategory !== "") {
                        query += `&category=${selectedCategory}`  // e.g. page=1&category=agriculture
                    }

                    // if current selected category AND sub category, append sub category to query string
                    if (selectedCategory && selectedCategory !== "" && subCategoryFilter && subCategoryFilter !== "") {
                        query += `&subcategory=${subCategoryFilter}`  // e.g. page=1&category=agriculture&subcategory=farming
                    }
                    const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/fetchAll?${query}`);

                    if (!response.ok) {
                        throw new Error(`Status: ${response.status}`);
                    }

                    const data = await response.json();

                    // if data length is 0 exit out of while loop, else add the data to the allData array and continue
                    if (data.length === 0) {
                        hasMoreData = false;
                    } else {
                        allData = allData.concat(data);
                        pageIndex++;
                    }
                }

                // lastly, once we iterate over all pages set the summaryList state with allData array
                setSummaryList(allData);
            } catch (error) {
                console.error("Could not fetch summary", error);
            }
        };

        fetchSummaryList();
    }, [selectedCategory, subCategoryFilter]) // when selectedCategory OR subCategoryFilter run effect

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