// src/components/Live.js
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import socket from '../socket';

function Live() {
  const location = useLocation();
  const navigate = useNavigate();
  // Destructure song, userRole, and instrument from navigation state.
  const { song, userRole = 'player', instrument = '' } = location.state || {};

  // For regular users: if their instrument is "vocals" (ignoring case), then they are a singer.
  const isSinger = (userRole !== 'admin' && instrument.toLowerCase() === 'vocals');

  const [autoScroll, setAutoScroll] = useState(false);
  const contentRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    // Listen for further song updates (optional).
    socket.on('songUpdate', (data) => {
      console.log('Live: Received songUpdate:', data);
      // Optionally update song display dynamically.
    });
    
    // Listen for sessionQuit event.
    socket.on('sessionQuit', () => {
      console.log('Live: Received sessionQuit event');
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

  // Auto-scroll effect: start or clear an interval based on autoScroll state.
  useEffect(() => {
    if (autoScroll) {
      // Start scrolling every 50ms by 5 pixels (increased from 1 for better visibility)
      scrollIntervalRef.current = setInterval(() => {
        if (contentRef.current) {
          console.log('Scrolling...');
          contentRef.current.scrollBy({ top: 5, behavior: 'smooth' });
        }
      }, 50);
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    }
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [autoScroll]);
  

  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
  };

  const quitSession = () => {
    socket.emit('quitSession', {});
  };

  if (!song) {
    return <p>No song selected.</p>;
  }

  return (
    <div style={{ fontSize: '1.5em', backgroundColor: '#fff', color: '#000', padding: '1em' }}>
      <h2>{song.name}</h2>
      <h3>by {song.artist}</h3>
      {/* Song content container with a ref for scrolling */}
      <div ref={contentRef} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
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
