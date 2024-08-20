import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // React frontend URL
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Apply CORS middleware

// Parse JSON bodies
app.use(express.json());

const router = express.Router();

app.get('/', (req, res) => {
  return res.json("From backend side");
});

// Database connection
const db = mysql.createConnection({
  host: '0.0.0.0',
  user: 'root',
  password: 'fullstackdb123',
  database: 'HD_FULL_STACK'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});
// Use the router
app.use('/api', router);
// Define your API route
router.get('/users', (req, res) => {
  const query = 'SELECT * FROM User';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err.stack);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    return res.json(results);
  });
});



// Start the server
app.listen(8080, () => {
  console.log("Running on port 8080");
});
