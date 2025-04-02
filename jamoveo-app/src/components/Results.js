// src/components/Results.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import heyJude from '../songs/hey_jude.json';
import veechShelo from '../songs/veech_shelo.json';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { query } = location.state || { query: '' };

  // For demonstration, combine both song JSON files
  const songs = [
    { id: 1, name: 'Hey Jude', artist: 'The Beatles', data: heyJude },
    { id: 2, name: 'Veech Shelo', artist: 'Artist Unknown', data: veechShelo }
  ];

  // A simple filter based on query (case-insensitive contains)
  const filteredSongs = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (song) => {
    // For demo, navigate to the Live page and send the song data via state.
    navigate('/live', { state: { song } });
  };

  return (
    <div>
      <h2>Search Results</h2>
      {filteredSongs.length > 0 ? (
        <ul>
          {filteredSongs.map((song) => (
            <li key={song.id} onClick={() => handleSelect(song)} style={{cursor:'pointer'}}>
              <strong>{song.name}</strong> by {song.artist}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
}

export default Results;
