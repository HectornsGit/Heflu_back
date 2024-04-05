import getDb from "../../config/getDb.js"

const deleteBookingModel = async (id) => {
    let connection
    try {
        connection = await getDb()
        await connection.query(` DELETE FROM bookings WHERE id = ?`, [id])
    } finally {
        if (connection) connection.release()
    }
}

export default deleteBookingModel
