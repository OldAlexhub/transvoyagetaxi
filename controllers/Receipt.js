import FlagModel from "../models/Flags.js";

const Receipt = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const show = await FlagModel.findOne({ bookingId });

    res.status(200).json({ message: `Receipt`, show });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default Receipt;
