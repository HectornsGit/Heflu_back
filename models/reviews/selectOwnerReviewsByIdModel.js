import getDb from "../../config/getDb.js"

const selectOwnerReviewsByIdModel = async (id) => {
    let connection

    try {
        connection = await getDb()
        const [reviews] = await connection.query(
            `SELECT * FROM reviews WHERE booking_id = ? AND is_owner = 1`,
            [id]
        )
        return reviews
    } finally {
        if (connection) connection.release()
    }
}

export default selectOwnerReviewsByIdModel
