import getDb from "../../config/getDb.js"

const selectAllUserInvolvedBookingsByIdModel = async (userId) => {
    let connection
    try {
        connection = await getDb()

        let [bookings] = await connection.query(
            `SELECT B.id, B.tenant_id, GROUP_CONCAT(I.name) AS property_images, P.name as title, P.owner_id AS owner_id FROM bookings B
            JOIN properties P ON property_id = P.id
            LEFT JOIN reviews R ON R.booking_id = B.id
            INNER JOIN properties_images X ON p.id = X.property_id
            INNER JOIN images I ON X.image_id = I.id
            WHERE ending_date < NOW() AND is_confirmed = TRUE AND (P.owner_id = ? OR B.tenant_id = ?)
            group by B.id`,
            [userId, userId]
        )
        return bookings
    } finally {
        if (connection) connection.release()
    }
}

export default selectAllUserInvolvedBookingsByIdModel
