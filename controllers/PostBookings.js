import BookingModel from "../models/Bookings.js";

const PostBooking = async (req, res) => {
  try {
    const {
      pickupDate,
      name,
      phoneNumber,
      pickupAddress,
      dropoffAddress,
      pickupTime,
      passengers,
      driver,
      distance,
      fare,
    } = req.body;

    const newBooking = new BookingModel({
      pickupDate,
      name,
      phoneNumber,
      pickupAddress,
      dropoffAddress,
      pickupTime,
      passengers,
      driver,
      distance,
      fare,
    });

    await newBooking.save();

    res.status(201).json({ message: `Booking Success` });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
    console.log(error);
  }
};

export default PostBooking;
