const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

app.use(express.json());
app.use(cors());

// In-memory "database" for users
const users = [];

/**
 * USER ROUTES
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

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  console.log('User logged in:', user);
  res.json({ message: 'Login successful', user });
});

/**
 * SONG SEARCH FROM TAB4U
 * Example: GET /api/songs/search?query=hey+jude
 */
app.get('/api/songs/search', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: 'Missing search query' });

  try {
    const searchUrl = `https://www.tab4u.com/search.php?word=${encodeURIComponent(query)}`;
    const { data } = await axios.get(searchUrl);
    const $ = cheerio.load(data);

    const results = [];

    $('ul.songList li a').each((i, el) => {
      const name = $(el).text().trim();
      const relativeUrl = $(el).attr('href');
      if (relativeUrl && relativeUrl.includes('tabs')) {
        const fullUrl = `https://www.tab4u.com/${relativeUrl}`;
        results.push({ name, url: fullUrl });
      }
    });

    res.json(results);
  } catch (err) {
    console.error('Error fetching Tab4U search:', err.message);
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
});

/**
 * Basic test route
 */
app.get('/', (req, res) => {
  res.send('JaMoveo Server is running.');
});

/**
 * SOCKET.IO LOGIC
 */
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('songUpdate', (songData) => {
    console.log('Server received songUpdate:', songData);
    io.emit('songUpdate', songData);
  });

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
