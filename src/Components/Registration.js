import './style.css';
import React, { useState, useEffect } from 'react';

const Registration = ({ onSubmit, formData }) => {
  const [fieldValidations, setFieldValidations] = useState({});
  const [localFormData, setLocalFormData] = useState({
    username: '',
    phoneNo: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Populate local form data when the formData prop changes
    if (formData) {
      setLocalFormData({
        username: formData ? formData.username : '',
        phoneNo: formData ? formData.phoneNo : '',
        email: formData ? formData.email : '',
        password:  formData ? formData.password : '',
        confirmPassword:  formData ? formData.password : '',
      });
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const phoneNoRegex = /^[6-9]{1}[0-9]{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validations = {
      username: !localFormData.username.trim() && 'Username is required.',
      phoneNo: !phoneNoRegex.test(localFormData.phoneNo) && 'Please enter a valid phone number.',
      email: !emailRegex.test(localFormData.email) && 'Please enter a valid email.',
      password: localFormData.password.length < 6 && 'Password should be at least 6 characters.',
      confirmPassword:
        localFormData.password !== localFormData.confirmPassword &&
        'Passwords do not match.',
    };

    console.log('Validations:', validations);

    setFieldValidations(validations);

    return Object.values(validations).every((validation) => !validation);
  };


  const handleRequest = async (url,method, successMessage) => {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localFormData),
      });

      if (!response.ok) {
        console.error(`Request failed. Status: ${response.status}`);
        // Handle request failure
        return;
      }

      console.log(successMessage);

      // Check if onSubmit is defined before calling
      if (typeof onSubmit === 'function') {
        // onSubmit receives the localFormData
        await onSubmit(localFormData);
      }

      // Reset local form data
      setLocalFormData({
        username: '',
        phoneNo: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      setFieldValidations({});
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await handleRequest(
        'http://localhost:5000/myapp/registration',
        'POST',
        'Registration successful'
      );
    } else {
      console.log('Form has validation errors. Cannot register.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await handleRequest(
        `http://localhost:5000/myapp/user/${formData._id}`, // Use the correct API endpoint for updating a user
        'PUT', // Specify the HTTP method as PUT
        localFormData,
        'Update successful'
      );
    } else {
      console.log('Form has validation errors. Cannot update.');
    }
  };


  return (
    <div className="form-container">
      <h2>{formData ? 'Edit User' : 'Registration'}</h2>
      <form className="registration-form" onSubmit={formData ? handleUpdate : handleRegister}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={localFormData.username}
            onChange={handleChange}
          />
          {fieldValidations.username && (
            <p style={{ color: 'red' }}>{fieldValidations.username}</p>
          )}
        </label>

        <label>
          Phone No.:
          <input
            type="text"
            name="phoneNo"
            value={localFormData.phoneNo}
            onChange={handleChange}
          />
          {fieldValidations.phoneNo && (
            <p style={{ color: 'red' }}>{fieldValidations.phoneNo}</p>
          )}
        </label>

        <label>
          Email:
          <input
            type="text"
            name="email"
            value={localFormData.email}
            onChange={handleChange}
          />
          {fieldValidations.email && (
            <p style={{ color: 'red' }}>{fieldValidations.email}</p>
          )}
        </label>

        {/* Include password and confirmPassword fields for registration */}
        {!formData && (
          <>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={localFormData.password}
                onChange={handleChange}
              />
              {fieldValidations.password && (
                <p style={{ color: 'red' }}>{fieldValidations.password}</p>
              )}
            </label>

            <label>
              Confirm Password:
              <input
                type="password"
                name="confirmPassword"
                value={localFormData.confirmPassword}
                onChange={handleChange}
              />
              {fieldValidations.confirmPassword && (
                <p style={{ color: 'red' }}>{fieldValidations.confirmPassword}</p>
              )}
            </label>
          </>
        )}

        <button type="submit">{formData ? 'Update' : 'Register'}</button>
      </form>
    </div>
  );
};

export default Registration;
