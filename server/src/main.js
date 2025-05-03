import fs from 'fs';
import path from 'path';
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'
import express from "express";

// ------------------ Importing main route from routes ------------------ //
import mainRoutes from './routes/main.route.js'

dotenv.config();
const app = express();

// ------------------ middleware added here ------------------ //
const allowedOrigins = [
    process.env.FRONT_URL_
];
// const allowedOrigins = [
//     process.env.FRONT_URL_,
//     'http://localhost:5173',
//     'http://localhost:5174',
//     'http://192.168.222.90:5173'
// ];

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

//-------------connection testing of api-----//
app.get("/", (request, response) => {
    console.log(request.body);
    response.status(200).send("API is working fine");
});

//---------middleware (Routes)---------------//
app.use('/', mainRoutes)
// app.use('/md/api/v1/user', mainRoutes)

export { app }