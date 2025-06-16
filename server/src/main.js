import fs from 'fs';
import path from 'path';
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'
import express from "express";

// ------------------ Importing main route from routes ------------------ //
import mainRoutes from './routes/main.route.js'
import { corsOptions } from './constants.js';


dotenv.config();
const app = express();

// --------------- Parsing Middlewares ---------------
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, withCredentials');
    next();
});

// ---------------------------------------
app.get("/", (request, response) => {
    response.status(200).send("API is working fine");
})


// ------------------ middleware for static files ------------------ //
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); //

// ------------------ mock data for mentors ------------------ //
app.get('/mentors', (req, res) => {
    const filepath = path.join(__dirname, '../data/mentors.json');
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        try {
            res.status(200).send(JSON.parse(data));
        }
        catch (e) {
            res.status(500).send('Internal Server Error');
        }
    });
})

//---------middleware (Routes)---------------//
app.use('/', mainRoutes)
// app.use('/md/api/v1/user', mainRoutes)

export { app }