// src/components/Signup.js
import React, { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    instrument: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your server.
    console.log('Signup form submitted:', formData);
    // Redirect to login page or main page after signup.
  };

  return (
    <div>
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <br />
        <select name="instrument" onChange={handleChange} required>
          <option value="">Select Instrument</option>
          <option value="guitar">Guitar</option>
          <option value="drums">Drums</option>
          <option value="bass">Bass</option>
          <option value="saxophone">Saxophone</option>
          <option value="keyboards">Keyboards</option>
          <option value="vocals">Vocals</option>
        </select>
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
