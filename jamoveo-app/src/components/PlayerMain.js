// src/components/PlayerMain.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';

function PlayerMain() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('PlayerMain: Connecting to socket...');
    socket.on('connect', () => {
      console.log('PlayerMain: Connected to socket with id', socket.id);
    });

    socket.on('songUpdate', (songData) => {
      console.log('PlayerMain: Received songUpdate:', songData);
      // Navigate to Live page when a song update is received
      navigate('/live', { state: { song: songData, userRole: 'player' } });
    });

    return () => {
      socket.off('songUpdate');
    };
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '2em' }}>
      <h2>Waiting for next song</h2>
    </div>
  );
}

export default PlayerMain;
