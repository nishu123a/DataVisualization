import express from 'express';
const app = express();
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';

// import from files
import reportRouter from './routes/index.js'

//setting up config.env file so that we can use content of it
//connecting server and database, just call this func^

app.use(cors());

// <------------ middlewares ------------> 

//we'll be sending data in json format, that's why it is required to use this middleware
app.use(express.json());

//we'll be using dynamic routes, in order to read the data from url we have to use this
app.use(express.urlencoded({ extended: true }));

//set 'credentials: true' to pass --> headers, cookies, etc to browser/frontend


// route splitting
app.use("/api/data", reportRouter)

// <-----------------------------------------------------------------------> 
const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB database is connected!");
        console.log("MONGO_URI:", process.env.MONGO_URI); // Move the log statement here
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

// variables
const PORT = process.env.PORT || 8000;

// it is a test route just to see our server is working
app.get("/", (req, res) => {
    return res.send(`<div style="background:magenta;padding:100px;"><h2>Welcome to Data Virtualization Server</h2>
    <p>Below are some examples of supported routes...</p>
        <div><ul>
            <li>GET all data from the database - /api/data</li>
            <li>GET data filtered by year - /api/data/year/:year</li>
            <li>GET data filtered by region - /api/data/region/:region</li>
            <li>Much more...</li>
        </ul></div>
    </div>`);
});

// function is used to bind and listen to the connections on the specified host and port
app.listen(PORT, () => {
    console.log(`Server is active on Port ${PORT}`);
    // Call the mongoDB function after starting the server
    mongoDB();
});
