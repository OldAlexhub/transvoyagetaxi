import VehicleModel from "../models/Vehicles.js";

const AddVehicle = async (req, res) => {
  try {
    const {
      cabNumber,
      make,
      model,
      year,
      color,
      lpexpiry,
      lpNumbers,
      vin,
      regExpiry,
    } = req.body;

    const existingCab = await VehicleModel.findOne({ cabNumber });
    if (existingCab) {
      return res.status(400).json({ message: `Cab Number already exist` });
    }

    const currentDate = new Date();

    // Validate expiration dates
    if (new Date(lpexpiry) < currentDate || new Date(regExpiry) < currentDate) {
      return res.status(400).json({ message: "Entered Expired Date or Dates" });
    }

    const newVehicle = new VehicleModel({
      cabNumber,
      make,
      model,
      year,
      color,
      lpexpiry,
      lpNumbers,
      vin,
      regExpiry,
    });

    await newVehicle.save();

    res.status(201).json({ message: `Vehicle Added Successfully` });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default AddVehicle;
