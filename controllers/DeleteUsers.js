import UserModel from "../models/Users.js";

const DeleteUsers = async (req, res) => {
  try {
    const { userId } = req.params;

    // Correctly find and delete the user by ID
    const deleteUser = await UserModel.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server Error!" });
  }
};

export default DeleteUsers;
