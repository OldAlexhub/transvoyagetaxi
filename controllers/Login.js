import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
  try {
    const { employeeId, email, password } = req.body;

    // Check if user exists with provided email and employeeId
    const user = await UserModel.findOne({ email, employeeId });
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }

    // Verify the provided password with the stored hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Email or Password is incorrect" });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRESIN,
      }
    );
    const name = `${user.fname} ${user.lname}`;
    const role = user.role;
    const employee = user.employeeId;
    // Respond with the token
    res
      .status(200)
      .json({ message: "Login successful", token, name, role, employee });
  } catch (error) {
    // Log the error for debugging
    console.error(error);

    // Respond with a generic server error message
    res.status(500).json({ message: "Server Error" });
  }
};

export default Login;
