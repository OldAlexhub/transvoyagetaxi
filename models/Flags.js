import mongoose from "mongoose";

const FlagSchema = new mongoose.Schema({
  bookingId: { type: Number, unique: true },
  date: { type: Date, default: new Date().toLocaleDateString() },
  pickupTime: { type: String },
  pickupAddress: { type: String },
  dropoffAddress: { type: String },
  dropoffTime: { type: String },
  distance: { type: String },
  fare: { type: Number },
  driverId: { type: String },
  name: { type: String },
  phoneNumber: { type: Number },
});

// Function to generate a random 5-digit number
const generateBookingId = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

// Pre-save middleware to set unique bookingId
FlagSchema.pre("save", async function (next) {
  const flag = this;

  if (!flag.isNew) {
    return next();
  }

  let unique = false;
  while (!unique) {
    const bookingId = generateBookingId();
    const existingFlag = await mongoose.models.Flag.findOne({ bookingId });
    if (!existingFlag) {
      flag.bookingId = bookingId;
      unique = true;
    }
  }

  next();
});

const FlagModel = mongoose.model("Flag", FlagSchema);

export default FlagModel;
