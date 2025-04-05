import express from 'express';
import authRoutes from '../routes/authRoutes'; // Adjust path if necessary
import blogRoutes from '../routes/blogRoutes';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

export default app;
