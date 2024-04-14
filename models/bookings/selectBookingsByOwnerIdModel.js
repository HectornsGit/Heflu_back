import getDb from "../../config/getDb.js"

const selectBookingsByOwnerIdModel = async (id) => {
    let connection
    try {
        connection = await getDb()

        let [bookings] = await connection.query(
            `SELECT B.id, B.tenant_id, B.property_id, P.name AS property, P.location, GROUP_CONCAT(i.name) as images,
            U.name AS tenant, B.starting_date, B.ending_date,  (DATEDIFF( B.ending_date, B.starting_date ) * P.price) AS total_price
            FROM bookings B
            JOIN properties P on P.id = B.property_id
            JOIN users U on B.tenant_id = U.id
            JOIN properties_images X on X.property_id = P.id
            JOIN images I on X.image_id = I.id
            WHERE P.owner_id = ? AND is_confirmed = 0
            GROUP BY P.id , B.id`,
            [id]
        )
        return bookings
    } finally {
        if (connection) connection.release()
    }
}

export default selectBookingsByOwnerIdModel
