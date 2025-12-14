import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect to database (non-blocking - server will run even if DB fails)
connectDB().catch(err => {
    console.error("Database connection error:", err.message);
    console.log("Server will continue running without database connection");
});

// middle wares
app.use(express.json());
app.use(cors());

// API endpoints
app.get('/',(req , res) =>{
    res.send("API is working!!!!")
});

app.listen(port , () => console.log("App started on port: " + port));