import HoursModel from "../models/HoursofService.js";

const DriverClockIn = async (req, res) => {
  try {
    const { driverId, timeIn, dateIn } = req.body;

    const newIn = new HoursModel({
      driverId,
      timeIn,
      dateIn,
    });

    await newIn.save();

    res.status(201).json({ message: "ClockIn Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

const DriverClockOut = async (req, res) => {
  try {
    const { driverId, timeOut, dateOut } = req.body;

    const updateOut = await HoursModel.findOneAndUpdate(
      { driverId, timeOut: null, dateOut: null },
      { timeOut, dateOut },
      { new: true }
    );

    if (!updateOut) {
      return res.status(404).json({ message: "ClockIn record not found" });
    }

    res.status(200).json({ message: "ClockOut Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export { DriverClockIn, DriverClockOut };
