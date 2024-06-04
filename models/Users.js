import mongoose from "mongoose";
import validator from "validator";

// Function to generate a random 5-digit number
const generateRandomEmployeeId = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

const UserSchema = new mongoose.Schema({
  date: { type: Date, default: new Date().toLocaleDateString() },
  employeeId: { type: Number, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  role: { type: String, enum: ["admin", "dispatcher"], required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Email is incorrect",
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
      message: "Passwords don't match",
    },
  },
});

// Pre-save middleware to generate a unique 5-digit employee ID
UserSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  let employeeId;
  let isUnique = false;

  while (!isUnique) {
    employeeId = generateRandomEmployeeId();
    const existingUser = await mongoose.models.User.findOne({ employeeId });
    if (!existingUser) {
      isUnique = true;
    }
  }

  this.employeeId = employeeId;
  next();
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
