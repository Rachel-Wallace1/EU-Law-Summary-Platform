import React, {useState} from 'react';
import {Container, Row, Col, Nav} from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";
import ManagerTasksComponent from "../components/ManagerTasksComponent";
import UserTableComponent from "../components/UserTableComponent";

const styles = {
    sidebar: {
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        padding: '20px'
    },
    navLink: {
        color: '#000000',
        margin: '5px 0',
        fontSize: '16px',
    },
    navLinkHover: {
        textDecoration: 'none',
    },
    active: {
        fontWeight: 'bold',
        backgroundColor: '#9ac6ef'
    }
};

// ManagerView component renders the UserTableComponent and ManagerTasksComponent
function ManagerView() {
    const [activeLink, setActiveLink] = useState('users'); // sets the current sidebar tab to render, in this case users tab

    // when a sidebar link is clicked (users or tasks) then the component chosen is rendered
    const handleLinkClick = (key) => {
        setActiveLink(key);
    };

    return (
        <Container fluid className="summaries-page">
            <Row>
                <Col xs={12} md={3} lg={2} style={styles.sidebar}>
                    <Nav className="flex-column" variant="pills" activeKey={activeLink}>
                        <Nav.Item>
                            <Nav.Link href="#users" style={styles.navLink} eventKey="users"
                                      onClick={() => handleLinkClick('users')}>Users</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#tasks" style={styles.navLink} eventKey="tasks"
                                      onClick={() => handleLinkClick('tasks')}>Tasks in Pipeline</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col xs={12} md={9} lg={10}>
                    <PageHeaderComponent title='Manager Settings'/>
                    {activeLink === "users" && <UserTableComponent/>}

                    {/* ManagerTasksComponent renders the statuses columns with appropriate grouped summaries and enables dragging and dropping using atlassian @hello-pangea/dnd (used by JIRA) */}
                    {activeLink === "tasks" && <ManagerTasksComponent/>}
                </Col>
            </Row>
        </Container>
    );
}

export default ManagerView;
