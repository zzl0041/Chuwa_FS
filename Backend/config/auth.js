const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env');
const envConfig = fs.readFileSync(envPath, 'utf8');

const lines = envConfig.split('\n');
const filteredLines = lines.filter(line => line.trim() !== '');

const JWT_SECRET = filteredLines[1].split('=')[1];

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Middleware for JWT authentication
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = { generateToken, authenticateToken };
