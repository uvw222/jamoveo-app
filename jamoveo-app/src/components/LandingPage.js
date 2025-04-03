// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import bannerImage from '../assets/rehearsal-illustration.png'; // Your purple band banner
import { FaPlay } from 'react-icons/fa';

function LandingPage() {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    // Redirect users to the signup page when the play button is clicked.
    navigate('/signup');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      // Dark purple gradient background
      background: 'linear-gradient(135deg, #3a0f65, #6f42c1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        // Semi-transparent white container
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '20px',
        width: '360px',
        padding: '20px',
        color: '#4c2f91',
        textAlign: 'center',
        boxShadow: '0 8px 16px rgba(76, 47, 145, 0.3)'
      }}>
        {/* Banner Image */}
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
        <h3 style={{ margin: '0', fontSize: '1.3em', color: '#4c2f91' }}>Now Playing</h3>
        <p style={{ margin: '5px 0 15px', fontSize: '0.9em', color: '#6f42c1' }}>JaMoveo</p>
        <p style={{ fontSize: '0.8em', marginBottom: '20px', color: '#6f42c1' }}>
          Join live rehearsals with synced chords & lyrics.
        </p>

        {/* Playback Controls with Play Button */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button 
            onClick={handlePlayClick} 
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#4c2f91',
              border: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(76, 47, 145, 0.4)',
              transition: 'background-color 0.3s ease'
            }}
          >
            <FaPlay size={36} color="#fff" />
          </button>
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

export default LandingPage;
