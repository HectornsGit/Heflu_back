import getDb from "../../config/getDb.js"

const selectPropertiesByOwnerIdModel = async (owner_id) => {
    let connection
    try {
        connection = await getDb()

        let [properties] = await connection.query(
            `SELECT * FROM properties WHERE owner_id = ?`,
            [owner_id]
        )
        return properties
    } finally {
        if (connection) connection.release()
    }
}

export default selectPropertiesByOwnerIdModel
