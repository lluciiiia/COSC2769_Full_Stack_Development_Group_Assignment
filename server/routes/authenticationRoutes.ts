import express from "express";
import { regisNewAccount, loginUser } from "../services/authenServices";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const result = await regisNewAccount(req.body);

    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error("Error in /register route:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await loginUser(req); // Notice no res passed

    if (result.status === 200) {
      res.status(200).json({ message: result.message, user: result.user });
    } else {
      res.status(result.status).json({ message: result.message });
    }
  } catch (err) {
    console.error('Error in /login route:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
