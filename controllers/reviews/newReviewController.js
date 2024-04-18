import generateError from "#scripts/generateError"
import validateSchema from "#scripts/validateSchema"
import selectBookingByIdModel from "../../models/bookings/selectBookingByIdModel.js"
import selectTenantReviewsByIdModel from "../../models/reviews/selectTenantReviewsByIdModel.js"
import selectOwnerReviewsByIdModel from "../../models/reviews/selectOwnerReviewsbyIdModel.js"
import insertReviewModel from "../../models/reviews/insertReviewModel.js"
import newReviewSchema from "../../schemas/newReviewSchema.js"
const newReviewController = async (req, res, next) => {
    try {
        const { id } = req.user
        const bookingId = req.params.id
        const [booking] = await selectBookingByIdModel(bookingId)
        let newReviewData = {
            comment: req.body.comment,
            rating: req.body.rating,
            bookingId,
        }
        await validateSchema(newReviewSchema, newReviewData)

        // Comprueba que la reserva sea una confirmada.
        if (booking.is_confirmed === 0) {
            throw generateError(
                403,
                "¡Esta reserva no fue confirmada! Solo puedes valorar sobre reservas que se hayan confirmado."
            )
        }

        // Comprueba que la estancia haya acabado
        if (Date.parse(booking.ending_date) >= Date.now()) {
            throw generateError(
                403,
                "¡Tienes que esperar a que acabe la estancia para valorar!"
            )
        }

        // Si el usuario ha sido el inquilino:
        if (id === booking.tenant_id) {
            // Comprobar que el usuario no ha hecho una review ya.
            const review = await selectTenantReviewsByIdModel(bookingId)

            if (review.length > 0) {
                throw generateError(
                    403,
                    "Solo puedes hacer una reseña sobre esta estancia."
                )
            }

            newReviewData.isOwner = 0

            // Si el usuario es el dueño:
        } else if (id === booking.owner_id) {
            // Comprobar que el usuario no ha hecho una review ya.
            const review = await selectOwnerReviewsByIdModel(bookingId)

            if (review.length > 0) {
                throw generateError(
                    403,
                    "Solo puedes hacer una reseña sobre esta estancia."
                )
            }

            newReviewData.isOwner = 1
        } else {
            // Si el usuario es ajeno a esta estancia:
            throw generateError(
                403,
                "¡No puedes reseñar sobre reservas de otra persona!"
            )
        }

        insertReviewModel(newReviewData)

        res.status(200).send({
            status: "ok",
            message: "Reseña creada con éxito",
        })
    } catch (error) {
        next(error)
    }
}
export default newReviewController
