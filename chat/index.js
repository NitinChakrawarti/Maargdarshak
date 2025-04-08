import { app } from './src/server.js';
import { createServer } from 'http';
import { webSocketService } from './src/services/websocket.service.js';
import { connectDb } from './src/database/db.js';

const PORT = process.env.PORT || 3000;

// Connect to the database
connectDb();

// Create HTTP server
const server = createServer(app);

// Initialize WebSocket service with the HTTP server
webSocketService.initialize(server);

// Use the HTTP server to listen, not the Express app directly
server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
    console.log('WebSocket server is initialized');
});

export default app;