import getDb from "../../config/getDb.js"

const insertUserModel = async (
    name,
    email,
    bio,
    avatar,
    password,
    registrationCode
) => {
    let connection
    try {
        connection = await getDb()

        let [users] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        )

        if (users.length > 0) {
            const error = new Error("Ese email ya está registrado.")
            error.statusCode = "409"
        }

        await connection.query(
            `INSERT INTO users (email, name, bio, avatar, password, registrationCode) VALUES(?, ?, ?, ?, ?, ?)`,
            [email, name, bio, avatar, password, registrationCode]
        )
    } finally {
        if (connection) connection.release()
    }
}

export default insertUserModel
