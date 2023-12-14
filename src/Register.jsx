import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import logo from './educaidphoto.png'




export const Register = (props) => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic name validation
    if (!name || /\d/.test(name)) {
      setError('Please enter your full name in words.');
      return;
    }

    // Basic email verification
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Basic password validation
    if (!pass || pass.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Basic phone number verification
    const isValidPhoneNumber = (phoneNumber) => /^\d{10}$/.test(phoneNumber);

    // Example usage
    if (!isValidPhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/register', {
        name,
        email,
        password: pass,
        phoneNumber,
        schoolName,
        address,
      });

      console.log('Registration successful:', response.data);
      setSuccessMessage('Registration successful!'); 
      setError('');

      
    } catch (error) {
      if (error.response) {
      
        console.error('Error registering user. Server responded with:', error.response.status);
        console.error('Server response:', error.response.data);
        setError('Registration failed. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server.');
        setError('Registration failed. Please try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
        setError('Registration failed. Please try again.');
      }
    }
    setError('');
  };

  return (
    <div className="auth-form-container">
      <img src = {logo} alt="Logo" className="logo" />
      <h1>EducAid</h1>
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} type="name" id="name" placeholder="Enter your full name" name="name" />

        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email address" id="email" name="email" />

        <label htmlFor="password">Password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*******" id="password" name="password" />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="tel" id="phoneNumber" placeholder="Phone Number" name="phoneNumber" />

        <label htmlFor="schoolName">What school do you teach?</label>
        <input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} type="name" id="schoolName" placeholder="School Name" name="schoolName" />

        <label htmlFor="address">Home Address</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} type="name" id="address" placeholder="Address" name="address" />

        <button type="submit">Register</button>
      </form>

      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <span>Already have an account?</span>
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>Log In Here</button>

    </div>
  );
};
export default Register;