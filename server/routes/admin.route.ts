import express from "express";
import {
  createAdmin,
  resumeUser,
  suspendUser,
} from "../services/admin.service";
import { isAuthenticated } from "../middleware/authenticate";
const router = express.Router();

router.post("/",isAuthenticated ,async (req, res) => {
  try {
    const result = await createAdmin(req.body);
    res.status(200).json({ message: result.message, user: result.admin });
  } catch (error) {
    console.error("Error in /register route:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/suspend/:userId",isAuthenticated ,async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await suspendUser(userId);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/resume/:userId",isAuthenticated ,async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await resumeUser(userId);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
