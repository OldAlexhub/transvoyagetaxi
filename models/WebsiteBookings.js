import mongoose from "mongoose";

// Define the booking schema
const WebsiteBookingsSchema = new mongoose.Schema({
  bookingId: { type: Number, unique: true },
  pickupDate: { type: Date },
  name: { type: String },
  phoneNumber: { type: Number },
  pickupAddress: { type: String },
  dropoffAddress: { type: String },
  pickupTime: { type: String },
  passengers: { type: Number },
  driver: { type: String },
  distance: { type: String },
  fare: { type: Number },
  email: { type: String },
});

// Function to generate a unique 5-digit bookingId
async function generateUniqueBookingId() {
  let bookingId;
  let booking;
  do {
    bookingId = Math.floor(10000 + Math.random() * 90000); // Generate a 5-digit number
    booking = await WebBookingModel.findOne({ bookingId });
  } while (booking);
  return bookingId;
}

// Pre-save middleware to generate a unique bookingId
WebsiteBookingsSchema.pre("save", async function (next) {
  if (!this.bookingId) {
    this.bookingId = await generateUniqueBookingId();
  }
  next();
});

// Create the booking model
const WebBookingModel = mongoose.model("webbookings", WebsiteBookingsSchema);

export default WebBookingModel;
