import express from "express"
import isUser from "../middlewares/isUser.js"
import newBookingController from "../controllers/bookings/newBookingController.js"
import confirmBookingController from "../controllers/bookings/confirmBookingController.js"
import deleteBookingController from "../controllers/bookings/deleteBookingController.js"
import getBookingsController from "../controllers/bookings/getBookingsController.js"
import getUserBookingsController from "../controllers/bookings/getUserBookingsController.js"

const router = express.Router()

router.get("/asOwner", isUser, getBookingsController)
router.get("/asTenant", isUser, getUserBookingsController)
router.post("/", isUser, newBookingController)
router.put("/:id", isUser, confirmBookingController)
router.delete("/:id", isUser, deleteBookingController)
export default router
