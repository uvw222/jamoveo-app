import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import PlayerMain from './components/PlayerMain';
import AdminMain from './components/AdminMain';
import Results from './components/Results';
import Live from './components/Live';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
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
