import mongoose from "mongoose";

const connectToDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.log(`Failed to connect to MongoDB`);
    console.log(error);
  }
};

export default connectToDB;
