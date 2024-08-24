const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // Import the database connection function

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB(); // Call the function to connect to MongoDB

// Define a simple route
app.get('/', (req, res) => {
  res.json('From backend side');
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
