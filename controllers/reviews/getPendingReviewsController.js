import selectAllUserInvolvedBookingsByIdModel from "../../models/bookings/selectAlluserInvolvedBookingsByIdModel.js"
import selectOwnerReviewsByIdModel from "../../models/reviews/selectOwnerReviewsbyIdModel.js"
import selectTenantReviewsByIdModel from "../../models/reviews/selectTenantReviewsByIdModel.js"

const getPendingReviewsController = async (req, res, next) => {
    try {
        const { id } = req.user
        let pendingReviews = []

        const userInvolvedBookings =
            await selectAllUserInvolvedBookingsByIdModel(id)

        // Si no ha participado en ninguna estancia (como casero o inquilino).
        if (userInvolvedBookings.lenght < 1) {
            return res.status(204).send({
                status: "ok",
                data: [],
                message: "¡No has participado en ninguna estancia todavía!",
            })
        }

        // Estancias en las que el usuario ha sido el casero.
        const userInvolvedAsOwnerBookings = userInvolvedBookings.filter(
            (booking) => booking.owner_id === id
        )

        // Filtra las reservas ya reseñadas como casero
        for (let booking of userInvolvedAsOwnerBookings) {
            const review = await selectOwnerReviewsByIdModel(booking.id)
            if (review.length < 1) {
                pendingReviews.push(booking)
            }
        }

        // Estancias en las que el usuario ha sido el inquilino.
        const userInvolvedAsTenantBookings = userInvolvedBookings.filter(
            (booking) => booking.tenant_id === id
        )

        // Filtra las reservas ya reseñadas como inquilino.
        for (let booking of userInvolvedAsTenantBookings) {
            const review = await selectTenantReviewsByIdModel(booking.id)
            if (review.length < 1) {
                pendingReviews.push(booking)
            }
        }

        if (pendingReviews.length < 1) {
            return res.status(204).send({
                status: "ok",
                data: [],
                message: "¡No tienes reseñas pendientes!",
            })
        }

        // Convierte la string de las imágenes a un array.
        pendingReviews.forEach((review) => {
            review.property_images = review.property_images.split(",")
        })

        return res.status(200).send({ data: pendingReviews })
    } catch (err) {
        next(err)
    }
}
export default getPendingReviewsController
