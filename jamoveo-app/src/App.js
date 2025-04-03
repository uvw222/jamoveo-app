// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import AdminSignup from './components/AdminSignup';
import Login from './components/Login';
import PlayerMain from './components/PlayerMain';
import AdminMain from './components/AdminMain';
import Results from './components/Results';
import Live from './components/Live';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player" element={<PlayerMain />} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/results" element={<Results />} />
        <Route path="/live" element={<Live />} />
      </Routes>
    </Router>
  );
}

export default App;
