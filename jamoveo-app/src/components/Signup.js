// src/components/Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Password validation: at least 8 characters, one uppercase letter, and one symbol.
const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
};

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    instrument: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the password.
    if (!isValidPassword(formData.password)) {
      setError('Password must be at least 8 characters long, include at least one capital letter and one symbol.');
      return;
    }
    setError('');

    try {
      const res = await fetch('https://jamoveo-app-production.up.railway.app/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Signup failed');
      } else {
        setMessage(data.message);
        localStorage.setItem('instrument', formData.instrument);
      }
    } catch (err) {
      setError('An error occurred during signup.');
    }
  };

  return (
    <div style={{ margin: '2em', textAlign: 'center' }}>
      {message ? (
        <p style={{ color: 'green' }}>{message}</p>
      ) : (
        <>
          <h2>Sign Up</h2>
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
            <div>
              <select name="instrument" onChange={handleChange} required>
                <option value="">Select Instrument</option>
                <option value="guitar">Guitar</option>
                <option value="drums">Drums</option>
                <option value="bass">Bass</option>
                <option value="saxophone">Saxophone</option>
                <option value="keyboards">Keyboards</option>
                <option value="vocals">Vocals</option>
              </select>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Already registered?{' '}
        <Link to="/login">Click here to log in</Link>.
      </p>
      <p>
        Want to sign up as admin?{' '}
        <Link to="/admin/signup">
          <button type="button">Sign Up as Admin</button>
        </Link>
      </p>
    </div>
  );
}

export default Signup;
