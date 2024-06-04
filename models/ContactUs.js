import mongoose from "mongoose";

const ContactUsSchema = new mongoose.Schema({
  date: { type: Date, default: new Date().toLocaleDateString() },
  name: { type: String },
  phoneNumber: { type: Number },
  email: { type: String },
  request: { type: String },
  message: { type: String },
});

const ContactModel = mongoose.model("contactus", ContactUsSchema);

export default ContactModel;
