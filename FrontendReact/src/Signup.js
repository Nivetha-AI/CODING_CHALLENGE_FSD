import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import custom CSS

const Signup = () => {
  const [signupData, setSignupData] = useState({
    email: '',
    name: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle input change to update form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', signupData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage('Signup successful!'); // Success message
      navigate('/login');
    } catch (error) {
      if (error.response) {
        setMessage(`Signup failed: ${error.response.data}`); // Error from server
      } else {
        setMessage('Signup failed: An error occurred.'); // General error
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signupData.email}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={signupData.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Signup</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Signup;
