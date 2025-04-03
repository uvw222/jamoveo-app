// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function LandingPage() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '3em 0' }}>
      <h1>Welcome to JaMoveo</h1>
      <p style={{ fontSize: '1.2em', marginBottom: '2em' }}>
        A collaborative platform for live song rehearsals.
      </p>
      <div>
        <Link to="/login">
          <button type="button">Log In</button>
        </Link>
        <span style={{ margin: '0 1em' }}>or</span>
        <Link to="/signup">
          <button type="button">Sign Up</button>
        </Link>
      </div>
      <p style={{ marginTop: '2em', fontSize: '0.9em' }}>
        Experience a seamless, Apple-inspired design for your music rehearsals.
      </p>
    </div>
  );
}

export default LandingPage;
