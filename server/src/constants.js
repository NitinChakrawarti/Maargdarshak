import dotenv from "dotenv"

// ----------------------------------- Initilization of .env file -------------------------------------------
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
];

export const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            console.log(origin)
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    "Access-Control-Allow-Origin": "*",
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials']
};

dotenv.config();
export const envProvider = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
    FRONT_URL: process.env.FRONT_URL_,
    // Cloudinary Variables
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
    // Clerk Variables
    CLERK_JWT_PUBLIC_KEY: process.env.CLERK_JWT_PUBLIC_KEY,
    CLERK_API_KEY: process.env.CLERK_API_KEY,
    CLERK_FRONTEND_API: process.env.CLERK_FRONTEND_API
}

export const baseOptionsforDynamicOptions = {
    discriminatorKey: "optionstype",
    collection: "dynamicOptionsModel",
    timestamps: true
}
