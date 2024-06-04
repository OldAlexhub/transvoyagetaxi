import mongoose from "mongoose";

const HoursofServiceSchema = new mongoose.Schema({
  driverId: { type: String },
  timeIn: { type: String, required: true },
  dateIn: { type: String, required: true },
  timeOut: { type: String, default: null },
  dateOut: { type: String, default: null },
});

const HoursModel = mongoose.model("hours_of_service", HoursofServiceSchema);

export default HoursModel;
