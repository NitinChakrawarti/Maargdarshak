import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import chatRoutes from './routes/route.js';
import cors from 'cors';

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
    process.env.FRONT_URL_,
    'http://localhost:5173',
    'http://localhost:5174',
    'http://192.168.222.90:5173'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/chat', chatRoutes);

// Test and health endpoints
app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

app.get("/", (req, res) => {
    console.log("Request received at root endpoint");

    res.status(200).send("chat server is running");
});

export { app }