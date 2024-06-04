import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
  cabNumber: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  lpexpiry: { type: Date, required: true },
  lpNumbers: { type: String, required: true },
  vin: { type: String, required: true },
  regExpiry: { type: Date, required: true },
});
const VehicleModel = mongoose.model("vehicles", VehicleSchema);

export default VehicleModel;
