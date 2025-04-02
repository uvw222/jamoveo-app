// src/components/Results.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import socket from '../socket';
import heyJude from '../songs/hey_jude.json';
import veechShelo from '../songs/veech_shelo.json';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.query || '';

  // Example song data – adjust as needed
  const songs = [
    { id: 1, name: 'Hey Jude', artist: 'The Beatles', data: heyJude },
    { id: 2, name: 'Veech Shelo', artist: 'Artist Unknown', data: veechShelo }
  ];

  // Filter songs by query (case-insensitive)
  const filteredSongs = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
  );

 
const handleSelect = (song) => {
  // Emit the songUpdate event for all connected clients
  console.log('Admin: Emitting songUpdate:', song);

  socket.emit('songUpdate', song);
  // Navigate admin to the live view
  navigate('/live', { state: { song, userRole: 'admin' } });
};


  return (
    <div style={{ textAlign: 'center', marginTop: '2em' }}>
      <h2>Search Results for "{query}"</h2>
      {filteredSongs.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredSongs.map((song) => (
            <li
              key={song.id}
              style={{
                cursor: 'pointer',
                padding: '1em',
                border: '1px solid #ccc',
                margin: '0.5em auto',
                width: '50%'
              }}
              onClick={() => handleSelect(song)}
            >
              <strong>{song.name}</strong> by {song.artist}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default Results;
