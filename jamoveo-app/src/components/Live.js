// src/components/Live.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import socket from '../socket';

function Live() {
  const location = useLocation();
  const navigate = useNavigate();
  const { song } = location.state || {};
  const [autoScroll, setAutoScroll] = useState(false);
  const userRole = 'player'; // Change this based on your login logic ("admin" or "player")
  const isSinger = false; // For demo, set to true if the user is a singer

  useEffect(() => {
    // Listen for song updates from the server
    socket.on('songUpdate', (data) => {
      console.log('Song updated:', data);
      // Here you can update the displayed song if needed.
    });
    return () => {
      socket.off('songUpdate');
    };
  }, []);

  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
    // You can add logic here to automatically scroll the page content.
  };

  const quitSession = () => {
    // Only admin should be able to quit, here we simply navigate back to the main page.
    socket.emit('quitSession', {}); // You could broadcast this to all clients.
    navigate(userRole === 'admin' ? '/admin' : '/player');
  };

  if (!song) {
    return <p>No song selected.</p>;
  }

  return (
    <div style={{ fontSize: '1.5em', backgroundColor: '#fff', color: '#000', padding: '1em' }}>
      <h2>{song.name}</h2>
      <h3>by {song.artist}</h3>
      <div>
        {song.data.map((line, index) => (
          <div key={index}>
            {line.map((word, i) => (
              <span key={i} style={{ marginRight: '0.5em' }}>
                {isSinger || !word.chords ? word.lyrics : `${word.lyrics} (${word.chords})`}
              </span>
            ))}
          </div>
        ))}
      </div>
      <button onClick={toggleAutoScroll} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        {autoScroll ? 'Stop Scrolling' : 'Start Scrolling'}
      </button>
      {userRole === 'admin' && (
        <button onClick={quitSession} style={{ marginTop: '1em' }}>
          Quit
        </button>
      )}
    </div>
  );
}

export default Live;
