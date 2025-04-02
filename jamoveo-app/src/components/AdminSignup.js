// src/components/AdminSignup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminSignup() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the admin signup API endpoint
      const res = await fetch('https://jamoveo-app-production.up.railway.app/api/admin/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        // After successful signup, navigate to the login page
        navigate('/login');
      }
    } catch (err) {
      setError('An error occurred during admin signup.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2em' }}>
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
    </div>
  );
}

export default AdminSignup;
