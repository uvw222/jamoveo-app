// src/components/AdminMain.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminMain() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // In a full implementation, you would search your song database (including JSON files).
    console.log('Admin search query:', query);
    // For demo purposes, navigate to the results page with the query.
    navigate('/results', { state: { query } });
  };

  return (
    <div>
      <h2>Search any song...</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter song name in English or Hebrew"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <br />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default AdminMain;
