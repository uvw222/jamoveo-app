// src/components/BurgerMenu.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../App.css';

function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(prev => !prev);

  // Get the userRole from sessionStorage.
  const [userRole, setUserRole] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Update userRole whenever the location changes.
    setUserRole(sessionStorage.getItem('userRole') || '');
  }, [location]);

  return (
    <div>
      {/* Burger icon in the top left (only when menu is closed) */}
      {!open && (
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
            <FaBars />
          </button>
        </div>
      )}

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
          {/* Close (X) icon at the top right of the menu */}
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
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

          {/* Add spacing so links don't overlap the icon */}
          <div style={{ 
  marginTop: '3em', 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '1em' // space between each link 
}}>
            {/* Always show Home */}
            <Link to="/" onClick={toggleMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>
              Home
            </Link>

            {/* If not logged in, show Sign Up and Log In */}
            {!userRole && (
              <>
                <Link to="/signup" onClick={toggleMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>
                  Sign Up
                </Link>
                <Link to="/login" onClick={toggleMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>
                  Log In
                </Link>
              </>
            )}

            {/* If logged in as a regular user */}
            {userRole === 'player' && (
              <Link to="/player" onClick={toggleMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>
                Player
              </Link>
            )}

            {/* If logged in as admin */}
            {userRole === 'admin' && (
              <>
                <Link to="/admin" onClick={toggleMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>
                  Admin
                </Link>
                <Link to="/results" onClick={toggleMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>
                  Results
                </Link>
              </>
            )}

            {/* Live is common */}
            <Link to="/live" onClick={toggleMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>
              Live
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default BurgerMenu;
