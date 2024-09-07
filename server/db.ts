import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables from .env file
dotenv.config();

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://fullstack:123@atlascluster.wf8n3.mongodb.net/";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {});

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

// Export the connection function
export default connectDB;
