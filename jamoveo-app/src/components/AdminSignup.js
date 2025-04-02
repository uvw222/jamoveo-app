// src/components/AdminSignup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Password validation: at least 8 characters, one uppercase letter, and one symbol.
const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
};

function AdminSignup() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the password criteria.
    if (!isValidPassword(formData.password)) {
      setError('Password must be at least 8 characters long, include at least one capital letter and one symbol.');
      return;
    }
    setError('');

    try {
      // Replace the URL below with your deployed server URL if needed.
      const res = await fetch('https://jamoveo-app-production.up.railway.app/api/admin/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Signup failed');
      } else {
        // Display success message and prompt to log in.
        setMessage(data.message || 'Account successfully created.');
      }
    } catch (err) {
      setError('An error occurred during admin signup.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2em' }}>
      {message ? (
        <>
          <h2>{message}</h2>
          <p>Do you want to log in?</p>
          <Link to="/login">
            <button type="button">Log In</button>
          </Link>
        </>
      ) : (
        <>
          <h2>Admin Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input 
                type="text"
                name="username"
                placeholder="Admin Username"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input 
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Sign Up as Admin</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p>
            Already have an account? <Link to="/login">Log in here</Link>.
          </p>
        </>
      )}
    </div>
  );
}

export default AdminSignup;
