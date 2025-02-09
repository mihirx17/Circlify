const express = require('express');
const apiRouter = require('./ServerAPI');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const http = require('http'); // Import HTTP module
const { Server } = require('socket.io'); // Correctly import Server from socket.io

const app = express();
const port = 3000;

// Create an HTTP server instance
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200", // Adjust to your Angular frontend URL
        methods: ["GET", "POST"]
    }
});

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userInformation', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('send-message', (message) => {
        console.log('Message:', message);
        io.emit('message', message); // Broadcast message to all clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Middleware to log each request with timestamp to a file
app.use((req, res, next) => {
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    fs.appendFile(path.join(__dirname, 'server.log'), logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
    next();
});

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'Client/ClientSide/dist')));

// Use the router for API routes
app.use('/api', apiRouter);

// Catch-all route to serve Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Client/ClientSide/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server with Socket.io
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
