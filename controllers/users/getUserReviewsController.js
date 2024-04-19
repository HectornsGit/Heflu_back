import generateError from "../../scripts/generateError.js"
import selectUserByIdModel from "../../models/users/selectUserByIdModel.js"
import selectAllUserReviewsModel from "../../models/reviews/selectAllUserReviewsModel.js"

const getUserReviewsController = async (req, res, next) => {
    const { id } = req.params
    try {
        const [user] = await selectUserByIdModel(id)

        if (user === undefined) {
            throw generateError(404, "El usuario no se ha encontrado")
        }

        const userReviews = await selectAllUserReviewsModel(user.id)

        if (userReviews.length < 1) {
            return res.status(204).send({
                status: "ok",
                data: [],
                message: "No se encontraron valoraciones",
            })
        }

        res.status(200).send({
            data: userReviews,
        })
    } catch (error) {
        next(error)
    }
}

export default getUserReviewsController
