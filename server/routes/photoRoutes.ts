import express from "express";
import Photo from "../models/photo";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("lmao cc");
  res.json({ message: "lmao" });
});


export default router;
