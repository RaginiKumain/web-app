import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const UserList = ({ userList }) => {
  const navigate = useNavigate();

  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {userList.map((user) => (
          <li key={user._id}>
            <button
              className="user-item button-style"
              onClick={() => navigate(`/myapp/user/${user._id}/editInfo`, { state: { user } })}
            >
              {user.username}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
