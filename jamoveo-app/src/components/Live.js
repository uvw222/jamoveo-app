// src/components/Live.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import socket from '../socket';

function Live() {
  const location = useLocation();
  const navigate = useNavigate();
  // Extract song, userRole, and instrument from location.state.
  // For regular users, instrument is provided; for admin, it may be undefined.
  const { song, userRole = 'player', instrument = '' } = location.state || {};
  
  // For a regular user, if the instrument is 'vocals', they are a singer.
  const isSinger = (userRole !== 'admin' && instrument.toLowerCase() === 'vocals');
  
  const [autoScroll, setAutoScroll] = useState(false);

  useEffect(() => {
    // Optional: Listen for additional song updates if needed.
    socket.on('songUpdate', (data) => {
      console.log('Live: Received songUpdate:', data);
      // You can update the song dynamically here if desired.
    });
    
    // Listen for sessionQuit event broadcast from the server.
    socket.on('sessionQuit', () => {
      console.log('Live: Received sessionQuit event');
      // Navigate users to their appropriate main page.
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/player');
      }
    });
    
    // Cleanup listeners on unmount.
    return () => {
      socket.off('songUpdate');
      socket.off('sessionQuit');
    };
  }, [navigate, userRole]);

  // Toggle auto-scroll functionality.
  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
    // Add your auto-scroll logic if needed.
  };

  // Quit session handler (for admin only).
  const quitSession = () => {
    // Emit the quitSession event so all connected clients get notified.
    socket.emit('quitSession', {});
    // Optionally, you might navigate immediately, but here we wait for the server broadcast.
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
