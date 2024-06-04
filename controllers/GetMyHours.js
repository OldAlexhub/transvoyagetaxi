import UserClockInModel from "../models/UserClockIn.js";

const GetMyHours = async (req, res) => {
  try {
    const { userId } = req.params;
    const hours = await UserClockInModel.find({ userId });

    res.status(200).json({ message: `Hours Data`, hours });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
    console.log(error);
  }
};

export default GetMyHours;
