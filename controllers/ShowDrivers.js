import DriverModel from "../models/Drivers.js";

const ShowDrivers = async (req, res) => {
  try {
    const drivers = await DriverModel.find();

    res.status(200).json({ message: `Drivers`, drivers });
  } catch (error) {
    res.status(500).json({ message: `Server Error` });
  }
};

export default ShowDrivers;
