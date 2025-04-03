// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; 

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
    <div className="container">
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
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <input 
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={{ paddingRight: '2.5em' }}
          />
          <span 
            onClick={togglePassword}
            style={{
              position: 'absolute',
              right: '0.5em',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
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
