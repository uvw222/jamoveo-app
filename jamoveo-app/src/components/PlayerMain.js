// src/components/PlayerMain.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';
import '../App.css'; 
import BurgerMenu from './BurgerMenu';

function PlayerMain() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('PlayerMain: mounting and connecting...');
    
    socket.on('connect', () => {
      console.log('PlayerMain: Connected to socket with id', socket.id);
    });
  
    socket.on('songUpdate', (songData) => {
      console.log('PlayerMain: Received songUpdate:', songData);
      // Retrieve the instrument from sessionStorage.
      const instrument = sessionStorage.getItem('instrument') || '';
      console.log("Player's instrument:", instrument);
      navigate('/live', { state: { song: songData, userRole: 'player', instrument } });
    });
    
    return () => {
      console.log('PlayerMain: unmounting, removing songUpdate listener');
      socket.off('songUpdate');
    };
  }, [navigate]);

  return (
    <div className="container">
      <BurgerMenu />
      <h2>Waiting for next song</h2>
    </div>
  );
}

export default PlayerMain;
