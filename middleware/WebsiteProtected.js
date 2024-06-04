import jwt from "jsonwebtoken";
import CustomerModel from "../models/Customers.js";

const WebsiteprotectRoute = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "You are not logged in!" });
    }

    // Verification
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // Check if user exists
      const currentUser = await CustomerModel.findById(decoded.userId);
      if (!currentUser) {
        return res.status(401).json({ message: "Token has expired!" });
      }

      req.user = currentUser;
      next();
    });
  } catch (error) {
    console.log("Error in WebsiteprotectRoute:", error);
    res.status(500).json({ message: "Unauthorized!" });
  }
};

export default WebsiteprotectRoute;
