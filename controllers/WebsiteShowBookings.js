import WebBookingModel from "../models/WebsiteBookings.js";

const WebsiteShowBookings = async (req, res) => {
  try {
    const show = await WebBookingModel.find();

    res.status(200).json({ message: "show", show });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default WebsiteShowBookings;
