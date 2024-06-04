import CustomerModel from "../models/Customers.js";
import sendWelcomeEmail from "../email/Account.js";
import bcrypt from "bcrypt";

const WebsiteSignup = async (req, res) => {
  try {
    const { fname, lname, phoneNumber, email, password, confirmPassword } =
      req.body;

    const existingUser = await CustomerModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: `Customer Already exist!` });
    }

    if (phoneNumber.toString().length < 10) {
      return res
        .status(400)
        .json({ message: `Phone number is missing a digit or more!` });
    }

    if (password != confirmPassword) {
      return res.status(400).json({ message: `Passwords don't match!` });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newCustomer = new CustomerModel({
      fname,
      lname,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    await newCustomer.save();
    sendWelcomeEmail(newCustomer.email, newCustomer.fname);

    res.status(201).json({ message: `Customer Account Created Successfully!` });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
    console.log(error);
  }
};

export default WebsiteSignup;
