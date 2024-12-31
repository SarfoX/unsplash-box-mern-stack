import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";

import imageRoute from "./src/routes/image.route.js";
import userRoute from "./src/routes/user.route.js";
import connectDB from "./src/lib/mongodb.js";

// Configurations
dotenv.config()
const app = express();
connectDB();

const PORT = process.env.PORT;

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use('/api/images', imageRoute);
app.use('/api/user', userRoute);

app.listen(PORT, ()=>{
    console.log("App listening on port: " + PORT);
})