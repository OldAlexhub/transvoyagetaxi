import DriverModel from "../models/Drivers.js";

const GetOneDriver = async (req, res) => {
  try {
    const { driverId } = req.params;
    const show = await DriverModel.findOne({ driverId });

    res.status(200).json({ message: `Driver`, show });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default GetOneDriver;
