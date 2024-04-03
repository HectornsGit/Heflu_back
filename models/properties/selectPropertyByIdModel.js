import getDb from "../../config/getDb.js"

const selectPropertyByIdModel = async (id) => {
    let connection
    try {
        connection = await getDb()

        let [property] = await connection.query(
            `SELECT * FROM properties WHERE id = ?`,
            [id]
        )
        return property
    } finally {
        if (connection) connection.release()
    }
}

export default selectPropertyByIdModel
