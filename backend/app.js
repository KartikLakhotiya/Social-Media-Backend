import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/MongoDB.js";
import router from "./routes/user.routes.js";
import cors from 'cors';
import blogRouter from "./routes/blog.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

//middlewares for postman
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use("/api/user", router);
app.use("/api/blog", blogRouter);


app.get('/', (req, res) => {
    res.send("Social Media Backend Server is Ready.")
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
    connectDB();
})