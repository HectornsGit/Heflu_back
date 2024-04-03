import express from "express"
// Controllers
import newPropertyController from "../controllers/properties/newPropertyController.js"
import getAllPropertiesController from "../controllers/properties/getAllPropertiesController.js"

// Middlewares
import isUser from "../middlewares/isUser.js"

const router = express.Router()

router.post("/", isUser, newPropertyController)
router.get("/", getAllPropertiesController)
export default router
