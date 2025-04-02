import { io } from 'socket.io-client';

// Replace 'http://localhost:4000' with your server URL when deployed
const socket = io('http://localhost:4000');

export default socket;
