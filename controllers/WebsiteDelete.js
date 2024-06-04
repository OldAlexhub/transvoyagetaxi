import WebsiteBooking from "../models/WebsiteBookings.js";

const DeleteWebBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    // console.log(bookingId);
    const deleteBookings = await WebsiteBooking.findOneAndDelete({ bookingId });

    res.status(201).json({ message: `Trip Removed`, deleteBookings });
  } catch (error) {
    console.error("Server Error: ", error);
    res.status(500).json({ message: `Server Error` });
  }
};

export default DeleteWebBooking;
