import VehicleModel from "../models/Vehicles.js";

const updateVehicleDates = async (req, res) => {
  try {
    const { cabNumber } = req.params;
    console.log(cabNumber);
    const updateFields = req.body;

    const currentDate = new Date();
    const invalidDates = Object.keys(updateFields).filter((key) => {
      return new Date(updateFields[key]) < currentDate;
    });

    if (invalidDates.length > 0) {
      return res.status(400).json({ message: "Entered Expired Date or Dates" });
    }

    // Find and update the vehicle
    const updatedVehicle = await VehicleModel.findOneAndUpdate(
      { cabNumber },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({
      message: "Vehicle dates updated successfully",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!", error: error.message });
  }
};

export default updateVehicleDates;
