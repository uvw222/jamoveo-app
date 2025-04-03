// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import bannerImage from '../assets/rehearsal-illustration.png'; // replace with your purple band banner

function LandingPage() {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate('/signup');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f9f5ff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: '20px',
        width: '360px',
        padding: '20px',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
      }}>
        {/* Album Art */}
        <img
          src={bannerImage}
          alt="Rehearsing band"
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            borderRadius: '12px',
            marginBottom: '15px'
          }}
        />

        {/* Text */}
        <h3 style={{ margin: '0', fontSize: '1.3em' }}>Now Playing</h3>
        <p style={{ margin: '5px 0 15px', fontSize: '0.9em', color: '#ccc' }}>JaMoveo</p>
        <p style={{ fontSize: '0.8em', marginBottom: '20px', color: '#ddd' }}>
          Join live rehearsals with synced chords & lyrics.
        </p>

        {/* Playback Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          <button disabled style={iconButtonStyle}>⏮</button>
          <button onClick={handlePlayClick} style={{ ...iconButtonStyle, fontSize: '1.5em' }}>►</button>
          <button disabled style={iconButtonStyle}>⏭</button>
        </div>

        {/* Progress Bar (visual only) */}
        <div style={{ marginTop: '20px' }}>
          <input type="range" value="25" disabled style={{ width: '100%' }} />
          <div style={{ fontSize: '0.7em', display: 'flex', justifyContent: 'space-between', color: '#aaa' }}>
            <span>00:25</span>
            <span>02:30</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const iconButtonStyle = {
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '1.2em',
  cursor: 'pointer',
  opacity: 0.8
};

export default LandingPage;
