import mongoose from "mongoose";

const DriversSchema = new mongoose.Schema({
  date: { type: Date, default: new Date().toLocaleDateString() },
  driverId: { type: Number, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  dob: { type: Date, required: true },
  cbi: { type: Date, required: true },
  puc: { type: Date, required: true },
  dot: { type: Date, required: true },
  dlNumber: { type: String, required: true },
  dlExpiry: { type: Date, required: true },
  homeAddress: { type: String, required: true },
  homeCity: { type: String, required: true },
  zipCode: { type: Number, required: true },
  llcName: { type: String, required: true },
  ein: { type: String, required: true },
});

DriversSchema.pre("save", async function (next) {
  const driver = this;

  if (!driver.isNew) {
    return next();
  }

  const generateUniqueDriverId = async () => {
    let isUnique = false;
    let newDriverId;

    while (!isUnique) {
      newDriverId = Math.floor(10000 + Math.random() * 90000); // Generate a random 5-digit number
      const existingDriver = await mongoose.models.Driver.findOne({
        driverId: newDriverId,
      });
      if (!existingDriver) {
        isUnique = true;
      }
    }

    return newDriverId;
  };

  try {
    driver.driverId = await generateUniqueDriverId();
    next();
  } catch (error) {
    next(error);
  }
});

const DriverModel = mongoose.model("Driver", DriversSchema);

export default DriverModel;
