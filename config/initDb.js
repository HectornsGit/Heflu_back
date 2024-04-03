import dotenv from "dotenv"
dotenv.config()
import getDb from "./getDb.js"

export const main = async () => {
    let connection

    try {
        let connection = await getDb()

        console.log("Borrando tablas si existen...")

        await connection.query(
            "DROP TABLE IF EXISTS bookings, reviews, properties_images, images, properties, users"
        )

        console.log("Creando tablas si no existen...")

        console.log("---Creando tabla users---")
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
              id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
              email VARCHAR(100) NOT NULL UNIQUE,
              name VARCHAR(30) NOT NULL,
              password VARCHAR(100) NOT NULL,
              avatar VARCHAR(100) NULL,
              bio VARCHAR(500) NULL,
              created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
              modified_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
              registration_code VARCHAR(100) NULL,
              is_active TINYINT UNSIGNED NOT NULL DEFAULT 0
            )
        `)

        console.log("---Creando tabla properties---")
        await connection.query(`
            CREATE TABLE IF NOT EXISTS properties (
              id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
              name VARCHAR(150) NOT NULL,
              description VARCHAR(1000) NOT NULL,
              type ENUM('Chalet', 'Apartamento', 'Casa rural', 'Otros') NOT NULL,
              location VARCHAR(50) NULL,
              country VARCHAR(50) NULL,
              price DECIMAL(6,2) NULL,
              area INT UNSIGNED NOT NULL,
              bedrooms INT UNSIGNED NOT NULL,
              bathrooms INT UNSIGNED NOT NULL,
              created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
              modified_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
              owner_id INT UNSIGNED NOT NULL,
              FOREIGN KEY (owner_id) REFERENCES users (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            )
        `)

        console.log("---Creando tabla images---")
        await connection.query(`
            CREATE TABLE IF NOT EXISTS images (
              id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
              name VARCHAR(150) NOT NULL
            )
        `)

        console.log("---Creando tabla properties_images---")
        await connection.query(`
            CREATE TABLE IF NOT EXISTS properties_images (
              id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
              property_id INT UNSIGNED NOT NULL,
              image_id INT UNSIGNED NOT NULL,
              FOREIGN KEY (property_id) REFERENCES properties (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE, 
              FOREIGN KEY (image_id) REFERENCES images (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            )
        `)
        console.log("---Creando tabla bookings---")
        await connection.query(`
            CREATE TABLE IF NOT EXISTS bookings (
              id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
              starting_date DATETIME NULL,
              ending_date DATETIME NULL,
              is_confirmed TINYINT UNSIGNED NOT NULL DEFAULT 0,
              created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
              tenant_id INT UNSIGNED NOT NULL,
              FOREIGN KEY (tenant_id) REFERENCES users (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
              property_id INT UNSIGNED NOT NULL,
              FOREIGN KEY ( property_id) REFERENCES properties (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            )
        `)

        console.log("---Creando tabla reviews---")
        await connection.query(`
            CREATE TABLE IF NOT EXISTS reviews (
              id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
		          comment VARCHAR(200) NULL,
              rating ENUM('1', '2', '3', '4', '5') NOT NULL,
              is_owner TINYINT UNSIGNED NOT NULL DEFAULT 0,
              created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
              modified_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
              booking_id INT UNSIGNED NOT NULL,
              FOREIGN KEY (booking_id) REFERENCES bookings (id)
                ON UPDATE CASCADE
            )
        `)

        console.log("¡Tablas creadas con éxito!")
    } catch (err) {
        console.error("Error al crear las tablas:", err)
    } finally {
        if (connection) connection.release()
        process.exit()
    }
}

main()
