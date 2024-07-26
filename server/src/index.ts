import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router/index';
import { errorMiddleware } from './middlewares/error-middleware';
import { config } from 'dotenv'
config({ path: '.env' })

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || '';
const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`server started on ${PORT} port`));
    } catch (error) {
        console.log(error);
    }
}

start();