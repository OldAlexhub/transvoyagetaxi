import ActiveModel from "../models/ActiveDrivers.js";

const unassignDriver = async (req, res) => {
  try {
    const { driverId } = req.params;

    const deleteDriver = await ActiveModel.findOneAndDelete({ driverId });

    if (!deleteDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res
      .status(200)
      .json({ message: "Driver unassigned successfully", deleteDriver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!", error: error.message });
  }
};

export default unassignDriver;
