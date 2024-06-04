import mongoose from "mongoose";
import validator from "validator";

const CustomerSchema = new mongoose.Schema({
  date: { type: Date, default: new Date().toLocaleDateString() },
  clientId: { type: Number, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: `Email is incorrect`,
    },
  },
  password: { type: String, minlength: 8, required: true },
  confirmPassword: {
    type: String,
    select: false,
    default: undefined,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: `Passwords don't match!`,
    },
  },
});

// Pre-save middleware to generate a unique 5-digit clientId
CustomerSchema.pre("save", async function (next) {
  if (!this.clientId) {
    let clientId;
    let isUnique = false;
    while (!isUnique) {
      clientId = Math.floor(10000 + Math.random() * 90000); // Generate a 5-digit number
      const existingCustomer = await CustomerModel.findOne({ clientId });
      if (!existingCustomer) {
        isUnique = true;
      }
    }
    this.clientId = clientId;
  }
  next();
});

const CustomerModel = mongoose.model("customers", CustomerSchema);

export default CustomerModel;
