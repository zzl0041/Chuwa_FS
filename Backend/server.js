const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart');
const cors = require('cors');

dotenv.config();
const app = express();

// Enable CORS for all routes
app.use(cors());

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
