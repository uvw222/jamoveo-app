// src/components/BurgerMenu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../App.css';

function BurgerMenu() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(prev => !prev);

  return (
    <div>
      {/* Burger icon */}
      <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: '1000' }}>
        <button 
          onClick={toggleMenu}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.8em',
            color: '#4c2f91',
            cursor: 'pointer'
          }}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Floating menu */}
      {open && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '250px',
          height: '100%',
          backgroundColor: 'rgba(76, 47, 145, 0.9)',
          color: 'white',
          padding: '1em',
          zIndex: '999',
          display: 'flex',
          flexDirection: 'column',
          gap: '1em'
        }}> 
        {/* Close icon at the top right of the menu */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={toggleMenu}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.8em',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            <FaTimes />
          </button>
        </div>
          <Link to="/" onClick={toggleMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>
            Home
          </Link>
          <Link to="/signup" onClick={toggleMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>
            Sign Up
          </Link>
          <Link to="/login" onClick={toggleMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>
            Log In
          </Link>
          <Link to="/player" onClick={toggleMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>
            Player
          </Link>
          <Link to="/admin" onClick={toggleMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>
            Admin
          </Link>
          <Link to="/results" onClick={toggleMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>
            Results
          </Link>
          <Link to="/live" onClick={toggleMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>
            Live
          </Link>
        </div>
      )}
    </div>
  );
}

export default BurgerMenu;
