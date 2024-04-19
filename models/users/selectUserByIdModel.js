import getDb from "../../config/getDb.js"

const selectUserByIdModel = async (id) => {
    let connection
    try {
        connection = await getDb()

        let [users] = await connection.query(
            `SELECT *,
            ROUND((SELECT AVG(r.rating)
              FROM reviews r, bookings b, properties p
              WHERE p.owner_id = u.id
              AND p.id = b.property_id
              AND b.id = r.booking_id), 1) AS media_rating
            FROM users u 
               WHERE u.id = ?`,
            [id]
        )
        return users
    } finally {
        if (connection) connection.release()
    }
}

export default selectUserByIdModel
