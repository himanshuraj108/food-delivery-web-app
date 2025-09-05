import mongoose from "mongoose";

const dbconnect = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/food-delivery-app`);
  } catch (error) {
    console.log("MongoDB connection failed" + error);
  }
};

export default dbconnect;
