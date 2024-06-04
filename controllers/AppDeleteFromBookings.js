import BookingModel from "../models/Bookings.js";

const DeleteRequests = async (req, res) => {
  const { bookingId } = req.params;
  //   console.log(bookingId);
  try {
    await BookingModel.findOneAndDelete({ bookingId });
    res.status(200).json({ message: "Trip deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export default DeleteRequests;
