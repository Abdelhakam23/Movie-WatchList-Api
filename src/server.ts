import express from "express";
import movieRoutes from './routes/movieRoutes.ts';
import  authRoutes from './routes/authRoutes.ts'
import watchListRoutes from './routes/watchlistRoutes.ts'
import {config} from 'dotenv';
import { connectDB } from './config/db.ts';

config();
connectDB();


const app  = express();

app.use(express.json());

app.use('/auth',authRoutes)
app.use('/watchlist',watchListRoutes)
app.use("/movies",movieRoutes)
const PORT = 5001;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})