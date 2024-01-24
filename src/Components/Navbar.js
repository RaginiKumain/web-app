
import './style.css';
import React from 'react';
import {useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Handle navigation based on the button or link clicked
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="navbar">
      <button onClick={() => handleNavigation('/myapp/registration')}>
        Registration
      </button>
      <button onClick={() => handleNavigation('/myapp/login')}>
        Login
      </button>
      <button onClick={() => handleNavigation('/myapp/userList')}>
        User List
      </button>
    </div>
  );
};

export default Navbar;
