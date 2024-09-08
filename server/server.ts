import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./db";
import cookieParser from "cookie-parser";
// Importing Routes
import groupRoutes from "./routes/group.route";
import userRoutes from "./routes/user.route";
import postRoutes from "./routes/post.route";
import notificationRoutes from "./routes/notification.route";
import commentRoutes from "./routes/comment.route";
import reactionRoutes from "./routes/reaction.route";
import authenticationRoutes from "./routes/auth.route";
import sessionRoutes from "./routes/session.route";
import adminRoutes from "./routes/admin.route";
import session from "express-session";

const app = express();

const secret = process.env.YOUR_SECRET_KEY!;
app.use(cookieParser(secret));

// CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Connect to MongoDB
connectDB();

app.use(
  session({
    secret: secret, // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  }),
);

// Use different API routes
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/reactions", reactionRoutes);
app.use("/api/auth", authenticationRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json("From backend side");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});