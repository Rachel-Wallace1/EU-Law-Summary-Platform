import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import EditUserModalComponent from "./EditUserModalComponent";
import { UserRoleIntToStringMapping } from "./enums";
import DeleteUserModalComponent from "./DeleteUserModalComponent";

// ShowUser renders the user table with id, name, email, role, actions columns and rows
const ShowUser = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // get the list of users onload
    useEffect(() => {
        getUsers();
    }, [currentUser]);

    // function that calls backend to get user lists. sorts them in ascending order by id
    const getUsers = async () => {
        try {
            const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/users/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            // Sorting the users by id in ascending order
            const sortedUsers = responseData.users.sort((a, b) => a.id - b.id);
            setUsers(sortedUsers);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to load data');
        }
    };

    // on "Update Role" load modal to update the user role
    const handleEditUserClick = (user) => {
        setCurrentUser(user);
        setShowEditUserModal(true);
    };

    // on "Delete" load modal to delete the user
    const handleDeleteUserClick = (user) => {
        setCurrentUser(user);
        setShowDeleteUserModal(true);
    };

    return (
        <div className="mt-5">
            {error && <p>Error: {error}</p>}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.first_name} {user.last_name}</td>
                        <td>{user.username}</td>
                        <td>{UserRoleIntToStringMapping[user.role]}</td>
                        <td>
                            <Button variant="success" style={{ marginRight: '2px' }} onClick={() => handleEditUserClick(user)}>Update Role</Button>
                            <Button variant="danger" onClick={() => handleDeleteUserClick(user)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* display the edit user role modal, when currentUser AND showEditUserModal are defined */}
            {currentUser && (
                <EditUserModalComponent
                    show={showEditUserModal}
                    onHide={() => setShowEditUserModal(false)}
                    user={currentUser}
                    setCurrentUser={setCurrentUser}
                />
            )}
            {/* display the delete user modal, when currentUser AND showDeleteUserModal are defined */}
            {currentUser && (
                <DeleteUserModalComponent
                    show={showDeleteUserModal}
                    onHide={() => setShowDeleteUserModal(false)}
                    user={currentUser}
                    setCurrentUser={setCurrentUser}
                />
            )}
        </div>
    );
};

export default ShowUser;
