import VehicleModel from "../models/Vehicles.js";

const ShowVehicles = async (req, res) => {
  try {
    const show = await VehicleModel.find();

    res.status(200).json({ message: `Vehicles`, show });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default ShowVehicles;
