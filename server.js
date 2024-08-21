import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS middleware
import db from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import colors from 'colors';
import inrouter from './routes/insertRoute.js';


// Load environment variables
dotenv.config();

// Connect to MongoDB
db();

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for all routes (you can specify origins if needed)
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});
// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/user/action', inrouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.yellow.bold);
});
