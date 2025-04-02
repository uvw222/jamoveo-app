import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    // TODO: Add your signup logic (API call, etc.)
    console.log('Signup form submitted:', formData);
  };

  return (
    <div style={{ margin: '2em', textAlign: 'center' }}>
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
      <p>
        Already registered?{' '}
        <Link to="/login">Click here to log in</Link>.
      </p>
    </div>
  );
}

export default Signup;
