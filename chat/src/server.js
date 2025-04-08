import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import chatRoutes from './routes/route.js';

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/chat', chatRoutes);

// Test and health endpoints
app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

app.get("/", (req, res) => {
    res.status(200).send("chat server is running");
});

export { app }