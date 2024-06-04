import ActiveModel from "../models/ActiveDrivers.js";

const Activate = async (req, res) => {
  try {
    const { driverId, cabNumber } = req.body;

    const existingActive = await ActiveModel.findOne({ cabNumber });
    if (existingActive) {
      return res.status(400).json({ message: "Active cab exists!" });
    }

    const newActive = new ActiveModel({
      driverId,
      cabNumber,
    });

    await newActive.save();

    res.status(201).json({ message: `Driver Activated Successfully` });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default Activate;
