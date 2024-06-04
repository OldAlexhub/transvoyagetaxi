import UserClockInModel from "../models/UserClockIn.js";

const AllHours = async (req, res) => {
  try {
    const hours = await UserClockInModel.find();

    res.status(200).json({ message: `All Hours`, hours });
  } catch (error) {
    res.status(500).json({ message: `Server Error` });
  }
};

export default AllHours;
