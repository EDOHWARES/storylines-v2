import mongoose from "mongoose";

export const connectDb = async (): Promise<void> => {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stories_db');
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };