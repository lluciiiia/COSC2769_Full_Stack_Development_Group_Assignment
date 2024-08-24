import express, { Request, Response } from 'express';
import cors from 'cors';
import connectDB from './db';

// Importing your routes
// import groupRoutes from './routes/groupRoutes';

const app = express();

// CORS configuration
const corsOptions: cors.CorsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use different API routes
// app.use('/api/users', userRoutes);
// app.use('/api/groups', groupRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json('From backend side');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
