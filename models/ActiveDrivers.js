import mongoose from "mongoose";

const ActiveDriversSchema = new mongoose.Schema({
  date: { type: Date, default: new Date() },
  driverId: { type: String },
  cabNumber: { type: String },
});

const ActiveModel = mongoose.model("active_drivers", ActiveDriversSchema);

export default ActiveModel;
