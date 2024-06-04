import HoursModel from "../models/HoursofService.js";

const DriverHOS = async (req, res) => {
  try {
    const { driverId } = req.params;

    const show = await HoursModel.find({ driverId });

    res.status(200).json({ message: `HOS`, show });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default DriverHOS;
