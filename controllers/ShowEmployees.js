import UserModel from "../models/Users.js";

const ShowEmployees = async (req, res) => {
  try {
    const employees = await UserModel.find();

    res.status(200).json({ message: `Employee List`, employees });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};
export default ShowEmployees;
