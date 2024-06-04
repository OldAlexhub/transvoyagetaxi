import CustomerModel from "../models/Customers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const WebsiteLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await CustomerModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: `Password or email is incorrect!` });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: `Password or email in incorrect!` });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });

    const name = user.fname + " " + user.lname;
    const phone = user.phoneNumber;
    const mail = user.email;
    res
      .status(200)
      .json({ message: `Login Success`, token, name, phone, mail });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default WebsiteLogin;
