import FlagModel from "../models/Flags.js";

const AppMyCompleteFlags = async (req, res) => {
  try {
    const { driverId } = req.params;
    // console.log(driverId);
    const trips = await FlagModel.find({ driverId });

    res.status(200).json({ message: "Trips", trips });
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export default AppMyCompleteFlags;
