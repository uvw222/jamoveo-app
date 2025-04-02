// src/components/PlayerMain.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';
import '../App.css'; 
function PlayerMain() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('PlayerMain: mounting and connecting...');
    
    socket.on('connect', () => {
      console.log('PlayerMain: Connected to socket with id', socket.id);
    });
  
    socket.on('songUpdate', (songData) => {
      console.log('PlayerMain: Received songUpdate:', songData);
      const instrument = sessionStorage.getItem('instrument') || '';
      console.log('players instrument:', instrument);
      navigate('/live', { state: { song: songData, userRole: 'player', instrument } });
    });
    
  
    return () => {
      console.log('PlayerMain: unmounting, removing songUpdate listener');
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
