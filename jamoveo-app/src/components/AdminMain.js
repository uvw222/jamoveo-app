// src/components/AdminMain.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 
import BurgerMenu from './BurgerMenu';

function AdminMain() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to the Results page and pass the query in state.
    navigate('/results', { state: { query } });
  };

  return (
    <div className="container">
      <BurgerMenu />
      <h2>Search any song...</h2>
      <form onSubmit={handleSearch}>
        <input 
          type="text"
          placeholder="Enter song name or artist"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
          style={{ padding: '0.5em', width: '60%' }}
        />
        <br /><br />
        <button type="submit" style={{ width:'100px' }}>Search</button>
      </form>
    </div>
  );
}

export default AdminMain;
