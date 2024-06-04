import DriverModel from "../models/Drivers.js";

const updateDriverDates = async (req, res) => {
  try {
    const { driverId } = req.params;
    const updateFields = req.body;

    // Validate expiration dates if they are provided
    const currentDate = new Date();
    const invalidDates = Object.keys(updateFields).filter((key) => {
      return new Date(updateFields[key]) < currentDate;
    });

    if (invalidDates.length > 0) {
      return res.status(400).json({ message: "Entered Expired Date or Dates" });
    }

    // Find and update the driver
    const updatedDriver = await DriverModel.findOneAndUpdate(
      { driverId },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({
      message: "Driver dates updated successfully",
      driver: updatedDriver,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export default updateDriverDates;
