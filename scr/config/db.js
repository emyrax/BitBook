import mongoose from "mongoose"
import dotenv from  "dotenv/config"
//dotenv.config({ path: '../../.env' })

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
