import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/MongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send("Server is Ready.")
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
    connectDB();
})