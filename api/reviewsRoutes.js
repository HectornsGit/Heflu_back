import express from "express"
// Controllers
import newReviewController from "../controllers/reviews/newReviewController.js"
import getPendingReviewsController from "../controllers/reviews/getPendingReviewsController.js"
// Middlewares
import isUser from "../middlewares/isUser.js"

const router = express.Router()

router.post("/:id", isUser, newReviewController)
router.get("/pending", isUser, getPendingReviewsController)
export default router
