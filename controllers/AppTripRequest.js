import BookingModel from "../models/Bookings.js";

const AppTripRequest = async (req, res) => {
  try {
    const { driver } = req.params;

    const trips = await BookingModel.find({ driver });

    res.status(200).json({ message: `Trip Request`, trips });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default AppTripRequest;
