import dotenv from 'dotenv';
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/tasks.routes.js";
import usersRouters from "./routes/users.routes.js" 
import cors from "cors";

if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', usersRouters);

export default app;