// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import rehearsalImage from '../assets/rehearsal-illustration.png'; // make sure you import your generated image

function LandingPage() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '3em 1em', maxWidth: '900px', margin: 'auto' }}>
      
      {/* Hero Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2em' }}>
        <img src={rehearsalImage} alt="Band rehearsal illustration" style={{ maxWidth: '100%', borderRadius: '12px' }} />
        <h1>Welcome to JaMoveo</h1>
        <p style={{ fontSize: '1.2em', maxWidth: '600px' }}>
          Play together — wherever you are. JaMoveo lets you join real-time rehearsal sessions with your team and see lyrics or chords, depending on your instrument.
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
      </div>

      {/* How It Works */}
      <div style={{ marginTop: '4em', textAlign: 'left' }}>
        <h2 style={{ textAlign: 'center' }}>How It Works</h2>
        <ol style={{ fontSize: '1em', lineHeight: '1.8em', maxWidth: '600px', margin: 'auto' }}>
          <li><strong>Register</strong> and select the instrument you play.</li>
          <li><strong>Join a rehearsal session</strong> from your phone or desktop.</li>
          <li><strong>See chords or lyrics</strong> depending on your role, synced live by the admin.</li>
        </ol>
      </div>

      {/* Admin Feature Section */}
      <div style={{ marginTop: '4em', backgroundColor: '#f5f5f5', padding: '2em', borderRadius: '12px' }}>
        <h2>Admin Controls</h2>
        <p style={{ maxWidth: '600px', margin: '1em auto' }}>
          Admin users can create sessions, search for songs in English or Hebrew, and control what’s displayed to each musician.
        </p>
      </div>

      {/* Final CTA */}
      <div style={{ marginTop: '4em' }}>
        <h3>Ready to jam with your team?</h3>
        <Link to="/signup">
          <button type="button" style={{ marginTop: '1em' }}>Get Started</button>
        </Link>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: '4em', fontSize: '0.8em', color: '#777' }}>
        <p>© {new Date().getFullYear()} JaMoveo | Built for Moveo's music lovers</p>
      </footer>
    </div>
  );
}

export default LandingPage;
