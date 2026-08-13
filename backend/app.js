import studentRouter from "./routes/studentRoute.js";
import dotenv from 'dotenv'
import pool from "./config/db.js";
dotenv.config()
import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
const app = express()
const corsOptions = {
  origin: [
    "http://localhost:3000"
  ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(bodyParser.json({ limit: '10mb' }));
app.use("/students",studentRouter);

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})