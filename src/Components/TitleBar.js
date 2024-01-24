// TitleBar.js
import React from 'react';
import './style.css';

const TitleBar = ({ title }) => {
  return (
    <div className="title-bar">
      <span className="title">{title}</span>
    </div>
  );
};

export default TitleBar;
