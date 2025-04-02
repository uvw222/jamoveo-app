// src/components/Live.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import socket from '../socket';

function Live() {
  const location = useLocation();
  const navigate = useNavigate();
  // Destructure song, userRole, and instrument from navigation state.
  // Default userRole to 'player' and instrument to an empty string if not provided.
  const { song, userRole = 'player', instrument = '' } = location.state || {};

  // For regular users: if their instrument is "vocals" (ignoring case), then they are considered a singer.
  const isSinger = (userRole !== 'admin' && instrument.toLowerCase() === 'Vocals');

  const [autoScroll, setAutoScroll] = useState(false);

  useEffect(() => {
    // Listen for further song updates if needed (optional).
    socket.on('songUpdate', (data) => {
      console.log('Live: Received songUpdate:', data);
      // You could update the song display dynamically here if needed.
    });
    
    // Listen for sessionQuit event from the server.
    socket.on('sessionQuit', () => {
      console.log('Live: Received sessionQuit event');
      // Navigate based on role: admins go to /admin; regular users go to /player.
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/player');
      }
    });
    
    return () => {
      socket.off('songUpdate');
      socket.off('sessionQuit');
    };
  }, [navigate, userRole]);

  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
    // Implement auto-scroll logic if needed.
  };

  const quitSession = () => {
    // Only admin sees the Quit button.
    socket.emit('quitSession', {});
    // We wait for the server to broadcast the quit event and handle navigation.
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
                {/* If user is a singer (instrument "vocals"), show only lyrics; otherwise show lyrics with chords if available */}
                {isSinger || !word.chords ? word.lyrics : `${word.lyrics} (${word.chords})`}
              </span>
            ))}
          </div>
        ))}
      </div>
      <button 
        onClick={toggleAutoScroll} 
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
      >
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
