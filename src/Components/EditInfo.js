// EditInfo.js
import './style.css';
// EditInfo.js

import React, { useState, useEffect } from 'react';
import Registration from './Registration';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css';

const EditInfo = ({ onUpdate, onDelete }) => {
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
          setUser(userData.user);
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

      onUpdate(updatedUser);
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

      onDelete(location.state.user._id);
      navigate('/myapp/userList'); // Redirect to userList after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error - display a message to the user or perform other actions
    }
  };

  return (
    <div className="edit-info">
      <h2>Edit User Information</h2>
      {user && <Registration user={user} onSubmit={handleUpdate} />}
      <button type="button" onClick={handleDelete} className="btn-del">
        Delete User
      </button>
    </div>
  );
};

export default EditInfo;
