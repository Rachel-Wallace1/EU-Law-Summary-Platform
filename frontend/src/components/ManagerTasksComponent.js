import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import {DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd';
import {SummaryStatuses} from "./enums";
import {useCSRFToken} from './CSRFTokenContext';
import {useAuth} from './AuthContext';

// Helper to reorder tasks within the same list or move between lists
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

// Moves an item from one list to another list
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

function TaskCard({title, tasks, droppableId}) {
    return (
        <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
                <Card ref={provided.innerRef} {...provided.droppableProps}>
                    <Card.Header>{title}</Card.Header>
                    <Card.Body>
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                {(provided, snapshot) => (
                                    <Card
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="mb-2"
                                    >
                                        <Card.Body>
                                            <Card.Title>{task.name}</Card.Title>
                                            <Card.Text>Celex: {task.id}</Card.Text>
                                            <Card.Text>Date added: {task.dateAdded}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                )}
                            </Draggable>
                        ))}
                    </Card.Body>
                    {provided.placeholder}
                </Card>
            )}
        </Droppable>
    );
}

function ManagerTasksComponent() {
    const {csrfToken} = useCSRFToken();
    const {user} = useAuth();
    const [summaryList, setSummaryList] = useState();
    const [tasks, setTasks] = useState({
        "New": [],
        "Revised": [],
        "Pending Approval": [],
        "Published": []
    });

    useEffect(() => {
        const fetchSummaryList = async () => {
            let allData = [];
            let pageIndex = 0;
            let hasMoreData = true;

            try {
                while (hasMoreData) {
                    const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/fetchAll?page=${pageIndex}`);

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

                setSummaryList(allData)
            } catch (error) {
                console.error("Could not fetch summary", error);
            }
        };

        fetchSummaryList();
    }, [])

    useEffect(() => {
        const formatSummaryToTask = (summary) => ({
            id: summary.celexNumber,
            name: summary.title,
            dateAdded: summary.current.timestamp
        });

        const groupByStatus = (acc, summary) => {
            if (summary && summary.celexNumber !== "" && summary.status) {
                const status = summary.status;
                if (SummaryStatuses.includes(status)) {
                    if (!acc.ids[status]) {
                        acc.ids[status] = new Set();
                    }
                    if (!acc.ids[status].has(summary.celexNumber)) {
                        acc.ids[status].add(summary.celexNumber);
                        acc.tasks[status] = acc.tasks[status] || [];
                        acc.tasks[status].push(formatSummaryToTask(summary));
                    }
                } else {
                    console.error(`Unexpected status '${status}' received, not matching any valid statuses`);
                }
            }
            return acc;
        };

        if (summaryList) {
            const groupedTasks = summaryList.reduce(groupByStatus, {tasks: {}, ids: {}});
            setTasks(prevTasks => ({
                ...prevTasks,
                ...groupedTasks.tasks
            }));
        }
    }, [summaryList]);

    // This function will handle drag & drop functionality
    const onDragEnd = (result) => {
        const {source, destination} = result;

        // Dropped outside the list
        if (!destination) {
            return;
        }

        const sourceId = source.droppableId;
        const destId = destination.droppableId;

        if (sourceId === destId) {
            const items = reorder(
                tasks[sourceId],
                source.index,
                destination.index
            );

            setTasks(prevTasks => ({
                ...prevTasks,
                [sourceId]: items,
            }));
        } else {
            const result = move(
                tasks[sourceId],
                tasks[destId],
                source,
                destination
            );

            setTasks(prevTasks => ({
                ...prevTasks,
                [sourceId]: result[sourceId],
                [destId]: result[destId],
            }));

            const task = result[destId][destination.index];
            updateTaskStatus(task.id, destId);
        }
    };

    const updateTaskStatus = async (celex, newStatus) => {
        let summary = "";
        try {
            const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/edit/${celex}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            summary = data.current.summary;
        } catch (error) {
            console.error('Error updating task status: ', error);
        }

        try {
            const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/update/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify({
                    celexNumber: celex,
                    author: (user.first_name + " " + user.last_name) || 'No name',
                    status: newStatus,
                    summary: summary
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
        } catch (error) {
            console.error('Error updating task status: ', error);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container fluid>
                <Row>
                    {Object.keys(tasks).map(key => (
                        <Col key={key}>
                            <TaskCard
                                title={key.charAt(0).toUpperCase() + key.slice(1)}
                                tasks={tasks[key]}
                                droppableId={key}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </DragDropContext>
    );
}

export default ManagerTasksComponent;
