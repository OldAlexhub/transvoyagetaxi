import FlagModel from "../models/Flags.js";

const ShowCompletedTrips = async (req, res) => {
  try {
    const trips = await FlagModel.find();

    res.status(200).json({ message: `Trips`, trips });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default ShowCompletedTrips;
