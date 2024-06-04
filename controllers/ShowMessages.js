import ContactModel from "../models/ContactUs.js";

const ShowMessage = async (req, res) => {
  try {
    const messages = await ContactModel.find();

    res.status(200).json({ message: `Messages`, messages });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default ShowMessage;
