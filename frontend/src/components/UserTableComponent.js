import React, { useEffect, useState } from "react";
import {
  FaRegTrashAlt
} from "react-icons/fa"
import {useNavigate} from 'react-router-dom';

const ShowUser = () => {

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const handelDelete = async (id) => {
  //   try {
          
  //     const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/userDelete/`, {
  //       method: 'POST',
  //       headers: {
  //           'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify({
  //           id: id,
  //       })
        
  //   });
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
      
  //     const responseData = await response.json();
  //     setUser(responseData.users);

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
      try {
          
        const response = await fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_DNS}/api/users/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const responseData = await response.json();
        setUser(responseData.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
            {user?.map((item, i) => {
              return (
                <tr key={i + 1}>
                  <td>{i + 1}</td>
                  <td>{item.first_name} {item.last_name}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>
                    {/* <Link to={`/edit-user/${item.id}`}>Edit</Link> */}
                    {/* <button onClick={() => handelDelete(item.id)}>Delete</button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
};

export default ShowUser;
