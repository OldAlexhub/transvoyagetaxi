import FlagModel from "../models/Flags.js";

const AppStartTrip = async (req, res) => {
  try {
    const {
      pickupTime,
      pickupAddress,
      dropoffAddress,
      distance,
      fare,
      driverId,
      name,
      phoneNumber,
    } = req.body;

    const newFlagdown = new FlagModel({
      pickupTime,
      pickupAddress,
      dropoffAddress,
      distance,
      fare,
      driverId,
      name,
      phoneNumber,
    });

    await newFlagdown.save();

    res.status(201).json({ message: `Flagdown initiated` });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
    console.log(error);
  }
};

export default AppStartTrip;
