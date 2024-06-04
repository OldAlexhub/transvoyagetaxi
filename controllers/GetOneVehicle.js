import VehicleModel from "../models/Vehicles.js";

const GetOneVehicle = async (req, res) => {
  try {
    const { cabNumber } = req.params;

    const show = await VehicleModel.findOne({ cabNumber });

    res.status(200).json({ message: `Vehicle`, show });
  } catch (error) {
    res.status(500).jsn({ message: `Server Error!` });
  }
};

export default GetOneVehicle;
