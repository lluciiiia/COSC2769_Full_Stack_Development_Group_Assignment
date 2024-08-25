import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
  console.log("GET /users hit");
  res.json({ message: 'List of users' });
});

router.post('/', (req, res) => {
  res.json({ message: 'User created' });
});

router.delete('/', (req, res) => {
    console.log("DELETE /users hit");
  res.json({ message: 'User deleted' });
});

export default router;
