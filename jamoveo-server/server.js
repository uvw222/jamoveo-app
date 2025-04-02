// jamoveo-server/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' } // Allow all origins for demo purposes
});

// Middleware to parse JSON request bodies
app.use(express.json());
// Enable CORS so our client can call our APIs
app.use(cors());

// In-memory "database" for users
const users = [];

/**
 * Regular user signup endpoint.
 * Expects { username, password, instrument } in the request body.
 */
app.post('/api/signup', (req, res) => {
  const { username, password, instrument } = req.body;
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  const newUser = { username, password, instrument, role: 'user' };
  users.push(newUser);
  console.log('New user signed up:', newUser);
  res.status(201).json({ message: 'User signed up successfully' });
});

/**
 * Admin signup endpoint.
 * Expects { username, password } in the request body.
 * This is on a separate URL (/api/admin/signup) to differentiate admin users.
 */
app.post('/api/admin/signup', (req, res) => {
  const { username, password } = req.body;
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  const newUser = { username, password, role: 'admin' };
  users.push(newUser);
  console.log('New admin signed up:', newUser);
  res.status(201).json({ message: 'Admin signed up successfully' });
});

/**
 * Login endpoint for both regular and admin users.
 * Expects { username, password } in the request body.
 */
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  console.log('User logged in:', user);
  // In a real app, you would return a token. Here we return user details.
  res.json({ message: 'Login successful', user });
});

// A simple test route for the server.
app.get('/', (req, res) => {
  res.send('JaMoveo Server is running.');
});

// Socket.IO setup for real-time song updates.
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // When a client (admin) emits songUpdate, broadcast it to all clients.
  socket.on('songUpdate', (songData) => {
    console.log('Server received songUpdate:', songData);
    io.emit('songUpdate', songData);
  });

  // Handle session quit (admin command)
  socket.on('quitSession', () => {
    console.log('Session quit by admin.');
    io.emit('sessionQuit', {});
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
