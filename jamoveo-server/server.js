// jamoveo-server/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' } // Adjust CORS settings as needed
});

// A simple route for testing
app.get('/', (req, res) => {
  res.send('JaMoveo Server is running.');
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Example: when admin selects a song, broadcast it
  socket.on('selectSong', (songData) => {
    console.log('Song selected:', songData);
    io.emit('songUpdate', songData);
  });

  // When the admin quits the session
  socket.on('quitSession', () => {
    console.log('Session quit by admin.');
    io.emit('sessionQuit', {});
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
