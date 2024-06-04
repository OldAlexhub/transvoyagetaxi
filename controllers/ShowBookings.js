import BookingModel from "../models/Bookings.js";

const ShowBookings = async (req, res) => {
  try {
    const show = await BookingModel.find();

    res.status(200).json({ message: `Trips`, show });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default ShowBookings;
