import mongoose from "mongoose";

export const connectToDb = async () => {
  const connectionString = process.env.NEXT_PUBLIC_MONGODBURL;
  try {
    if (connectionString) {
      await mongoose.connect(connectionString);
      console.log("Connected To DB");
      return;
    }
    return console.log("Connection string not provided");
  } catch (error) {
    throw new Error("Mongodb connection error: " + error);
  }
};
