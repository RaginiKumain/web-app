import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TitleBar from './TitleBar';
import Navbar from './Navbar';
import Registration from './Registration';
import Login from './Login';
import UserList from './UserList';
import EditInfo from './EditInfo';
import './style.css';



const App = () => {
  const basePath = '/myapp';
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await fetch('http://localhost:5000/myapp/userList');
        if (response.ok) {
          const data = await response.json();
          setUserList(data.users);
        } else {
          console.error(`Failed to fetch user list. Status: ${response.status}`);
          setError('Failed to fetch user list. Please try again later.');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An unexpected error occurred while fetching user list.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserList();
  }, []);

  const addUser = (user) => {
    setUserList((prevList) => [...prevList, user]);
  };

  return (
    <Router>
      <div className="app">
        <TitleBar title="My React App" />
        <Navbar />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <Routes>
            <Route path={`${basePath}/registration`} element={<Registration addUser={addUser} userList={userList} setUserList={setUserList} />} />
            <Route path={`${basePath}/login`} element={<Login />} />
            <Route path={`${basePath}/user/:_id/editInfo`} element={<EditInfo userList={userList} />} />
            <Route path={`${basePath}/userList`} element={<UserList userList={userList} />} />
            <Route path={'/'} element={<Navigate to={`${basePath}/userList`} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
