
import './style.css';
import React, { useState, useEffect } from 'react';
import Registration from './Registration';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css';

const EditInfo = ({ setUserList }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/myapp/user/${location.state.user._id}/editInfo`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const userData = await response.json();
          console.log('Received user data in EditInfo component:', userData);
          setUser(userData.data);
        } else {
          console.error('Error fetching user data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [location.state.user._id]);

  const handleUpdate = async (updatedUser) => {
    try {
      // Add logic to update user in the backend if needed
      await fetch(`http://localhost:5000/myapp/user/${location.state.user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      // Fetch the updated user list
      const userListResponse = await fetch('http://localhost:5000/myapp/userList', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (userListResponse.ok) {
        const data = await userListResponse.json();
        setUserList(data.users); // Update the user list in the state
      } else {
        console.error(`Failed to fetch user list. Status: ${userListResponse.status}`);
        // Handle user list fetch failure
      }

      navigate('/myapp/userList'); // Redirect to userList after update
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error - display a message to the user or perform other actions
    }
  };


  const handleDelete = async () => {
    try {
      // Add logic to delete user in the backend if needed
      await fetch(`http://localhost:5000/myapp/user/${location.state.user._id}`, {
        method: 'DELETE',
      });

      navigate('/myapp/userList'); // Redirect to userList after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error - display a message to the user or perform other actions
    }
  };

  return (
    <div className="edit-info">
      <h2>Edit User Information</h2>
      {user && <Registration formData={user} onSubmit={handleUpdate} setUserList={setUserList} />}
      <button type="button" onClick={handleDelete} className="btn-del">
        Delete User
      </button>
    </div>
  );
};

export default EditInfo;
