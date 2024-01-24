import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/myapp/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Authentication successful, handle accordingly (e.g., redirect)
        console.log('Login successful!');
        navigate('/myapp/userlist'); // Use navigate to redirect
      } else {
        // Authentication failed, handle error
        const data = await response.json();
        setError(data.error || 'Failed to log in.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label className="form-label">
          Username:
          <input
            type="text"
            name="username"
            className="form-input username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="form-label">
          Password:
          <input
            type="password"
            name="password"
            className="form-input password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" className="form-button">
          Login
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/myapp/registration">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
