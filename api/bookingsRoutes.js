import express from "express"
import isUser from "../middlewares/isUser.js"
import newBookingController from "../controllers/bookings/newBookingController.js"

const router = express.Router()

router.post("/", isUser, newBookingController)
export default router
