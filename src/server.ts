import dotenv from 'dotenv';
import app from './config/app';
import connectDB from './config/db';

dotenv.config();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();
