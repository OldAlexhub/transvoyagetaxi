import DriverModel from "../models/Drivers.js";

const AddDriver = async (req, res) => {
  try {
    const {
      fname,
      lname,
      phoneNumber,
      dob,
      cbi,
      puc,
      dot,
      dlNumber,
      dlExpiry,
      homeAddress,
      homeCity,
      zipCode,
      llcName,
      ein,
    } = req.body;

    const currentDate = new Date();

    // Validate expiration dates
    if (
      new Date(cbi) < currentDate ||
      new Date(puc) < currentDate ||
      new Date(dot) < currentDate ||
      new Date(dlExpiry) < currentDate
    ) {
      return res.status(400).json({ message: "Entered Expired Date or Dates" });
    }

    // Validate age
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    if (age < 21) {
      return res.status(400).json({ message: "Driver must be older than 21" });
    }

    // Validate phone number
    if (phoneNumber.toString().length < 10) {
      return res.status(400).json({ message: "Phone number is incomplete" });
    }

    // Create new driver instance
    const newDriver = new DriverModel({
      fname,
      lname,
      phoneNumber,
      dob,
      cbi,
      puc,
      dot,
      dlNumber,
      dlExpiry,
      homeAddress,
      homeCity,
      zipCode,
      llcName,
      ein,
    });

    // Save the new driver to the database
    await newDriver.save();

    res.status(201).json({ message: "Driver added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export default AddDriver;
