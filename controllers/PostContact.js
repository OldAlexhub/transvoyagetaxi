import ContactModel from "../models/ContactUs.js";

const PostContact = async (req, res) => {
  try {
    const { name, phoneNumber, email, request, message } = req.body;

    const newMessage = new ContactModel({
      name,
      phoneNumber,
      email,
      request,
      message,
    });

    await newMessage.save();

    res.status(201).json({ message: `Message Sent!` });
  } catch (error) {
    res.status(500).json({ message: `Server Error!` });
  }
};

export default PostContact;
