import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DB_URL || "");
    }
  } catch (e) {
    console.log(e);
  }
};

export default connectDB;
