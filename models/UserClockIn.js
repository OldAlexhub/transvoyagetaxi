import mongoose from "mongoose";

const UserClockInSchema = new mongoose.Schema({
  userId: { type: String },
  timeIn: { type: String, required: true },
  dateIn: { type: String, required: true },
  timeOut: { type: String, default: null },
  dateOut: { type: String, default: null },
});

const UserClockInModel = mongoose.model("UserClockIn", UserClockInSchema);

export default UserClockInModel;
