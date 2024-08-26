import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./db";

// Importing Routes
import groupRoutes from "./routes/groupRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import notiRoutes from "./routes/notiRoutes";
import commentRoutes from "./routes/commentRoutes";
import reactionRoutes from "./routes/reactionRoutes";
import authenticationRoutes from "./routes/authenticationRoutes";
const app = express();

// CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use different API routes
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notiRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/reactions", reactionRoutes);
app.use("/api/user",authenticationRoutes);
app.get("/", (req: Request, res: Response) => {
  res.json("From backend side");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
