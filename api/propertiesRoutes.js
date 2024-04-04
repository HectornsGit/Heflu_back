import express from "express"
// Controllers
import newPropertyController from "../controllers/properties/newPropertyController.js"
import getAllPropertiesController from "../controllers/properties/getAllPropertiesController.js"
import getPropertyController from "../controllers/properties/getPropertyController.js"

// Middlewares
import isUser from "../middlewares/isUser.js"

const router = express.Router()

router.post("/", isUser, newPropertyController)
router.get("/", getAllPropertiesController)
router.get("/:id", getPropertyController)
export default router
