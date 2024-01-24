import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const UserList = ({ userList }) => {
  const navigate = useNavigate();

  return (
    <div className="user-list">
      <h2>User List</h2>
      {userList.map((user) => (
        <button
          key={user._id}
          className="user-item button-style"
          onClick={() => navigate(`/myapp/user/${user._id}/editInfo`, { state: { user } })}
        >
          {user.username}
        </button>
      ))}
    </div>
  );
};

export default UserList;
