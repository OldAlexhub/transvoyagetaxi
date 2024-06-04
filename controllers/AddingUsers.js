import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";

const AddingUsers = async (req, res) => {
  try {
    const {
      fname,
      lname,
      phoneNumber,
      role,
      email,
      password,
      confirmPassword,
    } = req.body;

    if (
      !fname ||
      !lname ||
      !phoneNumber ||
      !role ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: `Missing Required Information` });
    }
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: `User already exists` });
    }

    if (password != confirmPassword) {
      return res.status(400).json({ message: `Passwords don't match` });
    }

    if (phoneNumber.toString().length < 10) {
      return res.status(400).json({ message: `Phone number is incomplete` });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      fname,
      lname,
      phoneNumber,
      role,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: `User created successfully` });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: `Server Error` });
  }
};

export default AddingUsers;
