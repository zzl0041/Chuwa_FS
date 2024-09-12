const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env');
const envConfig = fs.readFileSync(envPath, 'utf8');

const lines = envConfig.split('\n');
const filteredLines = lines.filter(line => line.trim() !== '');

const MONGO_URI = filteredLines[0].split('=')[1];
//console.log(MONGO_URI)

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
