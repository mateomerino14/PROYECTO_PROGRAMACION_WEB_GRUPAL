import mongoose from 'mongoose';
import { DATABASE_URI } from './env.config.js';

mongoose.set("strictQuery", false);
const mongoDB = DATABASE_URI;

export async function connectDatabase() {
  try {
    await mongoose.connect(mongoDB);
    console.log("Connection to database succesful 🥑");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}
