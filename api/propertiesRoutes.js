import express from "express"
import newPropertyController from "../controllers/properties/newPropertyController.js"
import isUser from "../middlewares/isUser.js"

const router = express.Router()

router.post("/", isUser, newPropertyController)
export default router
