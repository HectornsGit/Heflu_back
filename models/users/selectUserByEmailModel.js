import getDb from "../../config/getDb.js"

const selectUserByEmailModel = async (email) => {
    let connection
    try {
        connection = await getDb()

        let [users] = await connection.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        )
        return users
    } finally {
        if (connection) connection.release()
    }
}

export default selectUserByEmailModel
