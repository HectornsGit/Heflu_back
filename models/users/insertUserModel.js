import getDb from "../../config/getDb.js"
import generateError from "../../scripts/generateError.js"

const insertUserModel = async (newUserData, registrationCode) => {
    const { name, email, bio, avatar, password } = newUserData
    let connection
    try {
        connection = await getDb()

        let [users] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        )

        if (users.length > 0) {
            throw generateError(409, "Ese email ya está registrado")
        }

        await connection.query(
            `INSERT INTO users (email, name, bio, avatar, password, registration_code) VALUES(?, ?, ?, ?, ?, ?)`,
            [email, name, bio, avatar, password, registrationCode]
        )
    } finally {
        if (connection) connection.release()
    }
}

export default insertUserModel
