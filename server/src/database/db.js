import mongoose from "mongoose";

//------- To monitor the status of the mongoDB connection--------//
mongoose.connection.on('connecting', () => {
    console.log('db connecting, Status:', mongoose.connection.readyState)
})
mongoose.connection.on('connected', () => {
    console.log('db connected, Status:', mongoose.connection.readyState)
})
mongoose.connection.on('disconnecting', () => {
    console.log('db disconnecting, Status:', mongoose.connection.readyState)
})
mongoose.connection.on('disconnected', () => {
    console.log('db disconnected, Status:', mongoose.connection.readyState)
})

//----------------exporting database connection -----------//
let dbinstance;

export const connectDb = async () => {
    if (!dbinstance) {
        try {
            const db = await mongoose.connect(process.env.MONGO_URI, {
                dbName: "margdarshak",
            })
            dbinstance = db
            return dbinstance;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    else dbinstance
}