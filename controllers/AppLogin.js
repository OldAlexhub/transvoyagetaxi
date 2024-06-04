import ActiveModel from "../models/ActiveDrivers.js";

const AppLogin = async (req, res) => {
  try {
    const { driverId, cabNumber } = req.body;

    const user = await ActiveModel.findOne({ driverId });
    if (!user) {
      return res.status(401).json({ message: `Driver not found!` });
    }
    const driver = user.driverId;
    const number = user.cabNumber;

    res.status(200).json({ messsage: `Login Successful`, driver, number });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default AppLogin;
