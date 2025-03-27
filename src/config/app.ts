import express from 'express';
import cors from 'cors';
import blogRoutes from '../routes/blogRoutes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/blogs', blogRoutes);

export default app;
