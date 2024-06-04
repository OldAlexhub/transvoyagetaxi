import WebBookingModel from "../models/WebsiteBookings.js";
import sendConfirmation from "../email/Trip.js";

const WebsiteBookings = async (req, res) => {
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
      email,
    } = req.body;

    const newBooking = new WebBookingModel({
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
      email,
    });

    await newBooking.save();

    sendConfirmation(
      newBooking.email,
      newBooking.name,
      newBooking.pickupAddress,
      newBooking.pickupDate,
      newBooking.pickupTime,
      newBooking.dropoffAddress,
      newBooking.fare
    );
    res.status(201).json({ message: `Booking Success` });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
    console.log(error);
  }
};

export default WebsiteBookings;
