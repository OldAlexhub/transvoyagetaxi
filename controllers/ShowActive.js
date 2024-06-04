import ActiveModel from "../models/ActiveDrivers.js";

const ShowActive = async (req, res) => {
  try {
    const show = await ActiveModel.find();

    res.status(200).json({ message: `Active`, show });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default ShowActive;
