import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  return res.json("From backend side");
});

app.listen(8080, () => {
  console.log("Running on port 8080");
});

const db = mysql.createConnection({
  host: '10.247.194.45', 
  user: 'root',      
  password: 'fullstackdb', 
  database: 'HD_FULL_STACK' 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});
