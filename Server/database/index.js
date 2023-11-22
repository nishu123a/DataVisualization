import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
console.log("MongoDB URI:", process.env.MONGO_URI);

export const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB database is connected!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};
