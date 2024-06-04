import UserClockInModel from "../models/UserClockIn.js";

const ClockIn = async (req, res) => {
  try {
    const { userId, timeIn, dateIn } = req.body;

    const newIn = new UserClockInModel({
      userId,
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

const ClockOut = async (req, res) => {
  try {
    const { userId, timeOut, dateOut } = req.body;

    const updateOut = await UserClockInModel.findOneAndUpdate(
      { userId, timeOut: null, dateOut: null },
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

export { ClockIn, ClockOut };
