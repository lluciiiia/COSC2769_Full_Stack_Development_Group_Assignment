import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb+srv://fullstack:1234@atlascluster.olmxf.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster';

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      // useNewUrlParser and useUnifiedTopology are no longer needed
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

// Export the connection function
export default connectDB;
