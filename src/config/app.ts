import express from 'express';
import authRoutes from '../routes/authRoutes'; 
import blogRoutes from '../routes/blogRoutes';
import cors from "cors"

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

export default app;
