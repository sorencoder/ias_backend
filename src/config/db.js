import mongoose from "mongoose";

const connectDB = async () => {
  const connOptions = {
    serverSelectionTimeoutMS: 5000, // Keep trying to select a server for 5 seconds
  };

  try {
    await mongoose.connect(process.env.MONGO_URI, connOptions);
  } catch (error) {
    console.error("Initial MongoDB connection error:", error);
    throw error; // Rethrow error to be handled by the caller in server.js
  }
};

// Mongoose connection events
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected to:", mongoose.connection.host);
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected.");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected.");
});

export default connectDB;
