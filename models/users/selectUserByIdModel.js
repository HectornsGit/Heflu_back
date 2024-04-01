import getDb from "../../config/getDb.js"

const selectUserByIdModel = async (id) => {
    let connection
    try {
        connection = await getDb()

        let [users] = await connection.query(
            `SELECT * FROM users WHERE id = ?`,
            [id]
        )
        return users
    } finally {
        if (connection) connection.release()
    }
}

export default selectUserByIdModel
