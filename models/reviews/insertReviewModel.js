import getDb from "../../config/getDb.js"

const insertReviewModel = async (newReviewData) => {
    const { comment, rating, isOwner, bookingId } = newReviewData
    let connection
    try {
        connection = await getDb()
        const [newReview] = await connection.query(
            ` INSERT INTO reviews (comment, rating, is_owner, booking_id)
            VALUES(?,?,?,?)`,
            [comment, rating, isOwner, bookingId]
        )
        return newReview.insertId
    } finally {
        if (connection) connection.release()
    }
}

export default insertReviewModel
