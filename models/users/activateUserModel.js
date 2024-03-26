import getDb from "../../config/getDb.js"
import generateError from "../../scripts/generateError.js"

const activateUserModel = async (registration_code) => {
    let connection
    try {
        connection = await getDb()
        let [user] = await connection.query(
            `SELECT id, name FROM users WHERE registration_code = ?`,
            [registration_code]
        )

        if (user.length === 0) {
            throw generateError(
                "El usuario ya está activado o el código es incorrecto"
            )
        }

        await connection.query(
            `UPDATE users SET registration_code = NULL, is_active = 1  WHERE registration_code = ?`,
            [registration_code]
        )

        return user[0]
    } finally {
        if (connection) connection.release()
    }
}

export default activateUserModel
