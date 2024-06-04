import { Router } from "express";
import protectRoute from "../middleware/protectRoutes.js";
import restrictTo from "../middleware/restrictTo.js";
import AddingUsers from "../controllers/AddingUsers.js";
import Login from "../controllers/Login.js";
import ShowEmployees from "../controllers/ShowEmployees.js";
import DeleteUsers from "../controllers/DeleteUsers.js";
import { ClockIn, ClockOut } from "../controllers/ClockIn.js";
import GetMyHours from "../controllers/GetMyHours.js";
import AllHours from "../controllers/AllHours.js";
import AddDriver from "../controllers/AddDriver.js";
import updateDriverDates from "../controllers/UpdateDriver.js";
import AddVehicle from "../controllers/AddVehicles.js";
import updateVehicleDates from "../controllers/UpdateVehicle.js";
import ShowDrivers from "../controllers/ShowDrivers.js";
import GetOneDriver from "../controllers/GetOneDriver.js";
import GetOneVehicle from "../controllers/GetOneVehicle.js";
import ShowVehicles from "../controllers/ShowVehicles.js";
import Activate from "../controllers/Activate.js";
import ShowActive from "../controllers/ShowActive.js";
import UnassignDriver from "../controllers/Unassign.js";
import PostBooking from "../controllers/PostBookings.js";
import ShowBookings from "../controllers/ShowBookings.js";
import AppLogin from "../controllers/AppLogin.js";
import AppStartTrip from "../controllers/AppStartTrip.js";
import AppMyCompleteFlags from "../controllers/AppMyCompletedFlags.js";
import AppTripRequest from "../controllers/AppTripRequest.js";
import DeleteRequests from "../controllers/AppDeleteFromBookings.js";
import ShowCompletedTrips from "../controllers/ShowCompletedTrips.js";
import { DriverClockIn, DriverClockOut } from "../controllers/AppDriverHOS.js";
import DriverHOS from "../controllers/DriverHOS.js";
import Receipt from "../controllers/Receipt.js";
import WebsiteSignup from "../controllers/WebsiteSignup.js";
import WebsiteLogin from "../controllers/WebsiteLogin.js";
import WebsiteBookings from "../controllers/WebsiteBookings.js";
import WebsiteprotectRoute from "../middleware/WebsiteProtected.js";
import WebsiteShowBookings from "../controllers/WebsiteShowBookings.js";
import DeleteWebBooking from "../controllers/WebsiteDelete.js";
import PostContact from "../controllers/PostContact.js";
import ShowMessage from "../controllers/ShowMessages.js";

const router = Router();
const adminsOnly = restrictTo("admin");

//admin side
router.post("/login", Login);
router.post("/addingusers", protectRoute, adminsOnly, AddingUsers);
router.get("/employeelist", protectRoute, adminsOnly, ShowEmployees);
router.delete("/deleteuser/:userId", protectRoute, adminsOnly, DeleteUsers);
router.post("/clockin", protectRoute, ClockIn);
router.post("/clockout", protectRoute, ClockOut);
router.get("/myhours/:userId", protectRoute, GetMyHours);
router.get("/allhours", protectRoute, adminsOnly, AllHours);
router.post("/adddriver", protectRoute, adminsOnly, AddDriver);
router.put(
  "/update-dates/:driverId",
  protectRoute,
  adminsOnly,
  updateDriverDates
);
router.post("/addvehicle", protectRoute, adminsOnly, AddVehicle);
router.put("/update-vdates/:cabNumber", updateVehicleDates);
router.get("/drivers", protectRoute, adminsOnly, ShowDrivers);
router.get("/onedriver/:driverId", protectRoute, GetOneDriver);
router.get("/onevehicle/:cabNumber", protectRoute, GetOneVehicle);
router.get("/vehicles", protectRoute, ShowVehicles);
router.post("/activate", protectRoute, adminsOnly, Activate);
router.get("/showactive", protectRoute, ShowActive);
router.delete("/unassign/:driverId", protectRoute, adminsOnly, UnassignDriver);

router.post("/booking", protectRoute, PostBooking);
router.get("/bookings", protectRoute, ShowBookings);
router.get("/completedtrips", protectRoute, ShowCompletedTrips);
router.get("/driverhos/:driverId", protectRoute, adminsOnly, DriverHOS);
router.get("/receipt/:bookingId", protectRoute, Receipt);

router.get("/webbookings", protectRoute, WebsiteShowBookings);
router.delete("/deletewebbooking/:bookingId", protectRoute, DeleteWebBooking);

router.get("/showmessages", protectRoute, ShowMessage);

//app logic
router.post("/applogin", AppLogin);
router.post("/appflagdown", AppStartTrip);
router.get("/mytrips/:driverId", AppMyCompleteFlags);
router.get("/triprequests/:driver", AppTripRequest);
router.delete("/deletetrip/:bookingId", DeleteRequests);
router.post("/driverlogin", DriverClockIn);
router.post("/driverlogout", DriverClockOut);

//website
router.post("/websitesignup", WebsiteSignup);
router.post("/websitelogin", WebsiteLogin);
router.post("/websitebookings", WebsiteprotectRoute, WebsiteBookings);
router.post("/contactus", WebsiteprotectRoute, PostContact);

export default router;
