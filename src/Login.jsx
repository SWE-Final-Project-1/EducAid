// Import axios at the top of your file
import axios from 'axios';
import React, { useState } from "react";




export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Basic password validation
    if (!pass || pass.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
        const response = await axios.post('http://localhost:5001/login', {
          email,
          password: pass, // Send the password as 'password'
        });

      console.log('Login successful:', response.data);
     
    } catch (error) {
      console.error('Error logging in:', error.response.data);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="auth-form-container">
            <h1>EducAid</h1>
            <h2>Log In</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input  value = {email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youemail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value = {pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="*******" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <span>Don't have an account?</span><button className="link-btn" onClick={() =>props.onFormSwitch('register')}>Register Here </button>
            {error && <p style = {{color: 'red', textAlign: 'center'}} >{error}</p>}
            
        </div>

  );
};
