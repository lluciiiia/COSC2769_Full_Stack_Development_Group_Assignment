import express from "express";
import { regisNewAccount, loginUser } from "../services/authenServices";
import { sign } from "crypto";
const router = express.Router();

declare module 'express-session' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
}
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
    const result = await loginUser(req); 

    if (result.status === 200) {
      // Store user info in session
      req.session.user = result.user;

      // Create cookies based on session information
      res.cookie('isAuthenticated', true, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 ,signed:true});
      res.cookie('userId', req.session.user.id, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000,signed:true });
      res.cookie('userName', req.session.user.name, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, signed: true });

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
