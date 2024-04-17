import express from "express"
// Controllers
import newReviewController from "../controllers/reviews/newReviewController.js"

// Middlewares
import isUser from "../middlewares/isUser.js"

const router = express.Router()

router.post("/:id", isUser, newReviewController)

export default router
