
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';

function PlayerMain() {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for songUpdate events emitted by the admin
    socket.on('songUpdate', (songData) => {
      console.log('Song updated:', songData);
      // When a song is selected, navigate to the Live page
      navigate('/live', { state: { song: songData, userRole: 'player' } });
    });

    // Cleanup the event listener when the component unmounts
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
