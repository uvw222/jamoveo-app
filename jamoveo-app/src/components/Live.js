// src/components/Live.js
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import socket from '../socket';
import '../App.css'; 
import BurgerMenu from './BurgerMenu';

function Live() {
  const location = useLocation();
  const navigate = useNavigate();
  // Destructure song, userRole, and instrument from navigation state.
  // Make sure your song object includes a property like "language" ("he" for Hebrew, "en" for English).
  const { song, userRole = 'player', instrument = '' } = location.state || {};
  
  // Determine the language (defaulting to English if not provided)
  const songLanguage = song?.language || 'en';
  const isHebrew = songLanguage === 'he';
  
  // For regular users: if instrument is "vocals", then they're considered a singer.
  const isSinger = (userRole !== 'admin' && instrument.toLowerCase() === 'vocals');

  const [autoScroll, setAutoScroll] = useState(false);
  const contentRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    socket.on('songUpdate', (data) => {
      console.log('Live: Received songUpdate:', data);
      // Optionally update the displayed song here if you want dynamic changes.
    });
    
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

  useEffect(() => {
    if (autoScroll) {
      // Scroll every 50ms by 2 pixels (slower scrolling).
      scrollIntervalRef.current = setInterval(() => {
        if (contentRef.current) {
          console.log('Scrolling...');
          contentRef.current.scrollBy({ top: 2, behavior: 'smooth' });
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
    setAutoScroll((prev) => !prev);
  };

  const quitSession = () => {
    socket.emit('quitSession', {});
  };

  // If no song is selected, show a centered message with the burger menu still visible.
  if (!song) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '2em' }}>
        <BurgerMenu />
        <h2>No song selected.</h2>
      </div>
    );
  }

  return (
    <div 
      className="container" 
      style={{ 
        fontSize: '1.5em', 
        padding: '1em', 
        position: 'relative', 
        textAlign: isHebrew ? 'right' : 'center' 
      }}
    >
      <BurgerMenu />

      {/* For admin users, show the Quit button at the top right */}
      {userRole === 'admin' && (
        <button 
          onClick={quitSession} 
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '8px 12px',
            fontSize: '0.9em',
            backgroundColor: '#4c2f91',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '80px'
          }}
        >
          Quit
        </button>
      )}

      <h2>{song.name}</h2>
      <h3>by {song.artist}</h3>

      {/* Song content container with auto-scroll.
          The 'dir' and textAlign change based on the song language */}
      <div 
        ref={contentRef} 
        dir={isHebrew ? 'rtl' : 'ltr'} 
        style={{ 
          maxHeight: '70vh', 
          overflowY: 'auto', 
          marginBottom: '1em', 
          textAlign: isHebrew ? 'right' : 'left' 
        }}
      >
        {song.data.map((line, index) => {
          const hasChords = line.some(word => word.chords);
          return (
            <div key={index} style={{ marginBottom: '0.5em' }}>
              {hasChords && !isSinger && (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: isHebrew ? 'flex-end' : 'flex-start' 
                }}>
                  {line.map((word, i) => (
                    <span
                      key={i}
                      style={{
                        // For RTL, use marginLeft; for LTR, use marginRight.
                        margin: isHebrew ? '0 0 0 0.5em' : '0 0.5em 0 0',
                        display: 'inline-block',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        minWidth: '2em'
                      }}
                    >
                      {word.chords || ' '}
                    </span>
                  ))}
                </div>
              )}
              <div style={{ 
                display: 'flex', 
                justifyContent: isHebrew ? 'flex-end' : 'flex-start' 
              }}>
                {line.map((word, i) => (
                  <span 
                    key={i} 
                    style={{ 
                      margin: isHebrew ? '0 0 0 0.5em' : '0 0.5em 0 0', 
                      display: 'inline-block', 
                      minWidth: '2em' 
                    }}
                  >
                    {word.lyrics}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Auto-scroll toggle button */}
      <button 
        onClick={toggleAutoScroll} 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#4c2f91',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '0.8em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {autoScroll ? 'Stop' : 'Go'}
      </button>
    </div>
  );
}

export default Live;
