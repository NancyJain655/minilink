const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const linkRoutes = require('./routes/link.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors({
  origin : 'https://minilink-two.vercel.app/',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/link', linkRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
