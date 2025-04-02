// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; 
function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the login API endpoint
      const res = await fetch('https://jamoveo-app-production.up.railway.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        console.log('Login successful:', data);
        // Redirect based on role; here we simply redirect regular users to /player
        // and admins could be redirected to /admin
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/player');
        }
      }
    } catch (err) {
      setError('An error occurred during login.');
    }
  };

  return (
    <div style={{ margin: '2em', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text"
            name="username"
            placeholder="Username"
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
        <button type="submit">Log In</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Don't have an account?{' '}
        <Link to="/signup">Sign up here</Link>.
      </p>
    </div>
  );
}

export default Login;
