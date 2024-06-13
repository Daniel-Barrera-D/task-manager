// import dotenv from 'dotenv';
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/tasks.routes.js";
import usersRouters from "./routes/users.routes.js" 
import cors from "cors";
import { FRONT_URI, ORIGIN_CORS } from './config.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// if(process.env.NODE_ENV !== 'production') {
//     dotenv.config();
// }

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(cors({
    origin: ORIGIN_CORS,
    credentials: true
}));

console.log(ORIGIN_CORS);

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', usersRouters);

// console.log(__dirname);
app.use(express.static(join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile((join(__dirname, '../client/dist/index.html')));
})

export default app;