import { createConnection, createPool } from "mysql2/promise"
import "dotenv/config"

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env

let pool

const getDb = async () => {
    try {
        if (!pool) {
            const connection = await createConnection({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                timezone: "local",
            })

            await connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`)

            pool = createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: "local",
            })
        }

        return await pool.getConnection()
    } catch (err) {
        console.error("Error al conectar a la base de datos", err)
    }
}
export default getDb
