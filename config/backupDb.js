import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()
import getDb from "./getDb.js"

async function hashPassword(password) {
    const salt = await bcrypt.hash(password, 10)
    return salt
}

export const backupDb = async () => {
    let connection

    try {
        let connection = await getDb()

        console.log("---Añadiendo registros a la tabla users---")
        const users = [
            {
                email: "usuario1@example.com",
                name: "Usuario 1",
                password: await hashPassword("Usuario1."),
                avatar: "avatar1.jpg",
                bio: "¡Hola! Me encanta viajar por el mundo y descubrir sitios mágicos.",
                registration_code: null,
                is_active: 1,
            },
            {
                email: "usuario2@example.com",
                name: "Usuario 2",
                password: await hashPassword("Usuario2."),
                avatar: "avatar2.jpg",
                bio: "Soy un casero experimentado y me encanta compartir mi espacio con viajeros de todo el mundo.",
                registration_code: null,
                is_active: 1,
            },
            {
                email: "usuario3@example.com",
                name: "Usuario 3",
                password: await hashPassword("Usuario3."),
                avatar: "avatar3.jpg",
                bio: "Viajero entusiasta en busca de aventuras y lugares fascinantes para hospedarme.",
                registration_code: null,
                is_active: 1,
            },
            {
                email: "usuario4@example.com",
                name: "Usuario 4",
                password: await hashPassword("Usuario4."),
                avatar: "avatar4.jpg",
                bio: "Me encanta compartir mi hogar con turistas de todo el mundo para que disfruten de una experiencia acogedora y memorable.",
                registration_code: null,
                is_active: 1,
            },
            {
                email: "usuario5@example.com",
                name: "Usuario 5",
                password: await hashPassword("Usuario5."),
                avatar: "avatar5.jpg",
                bio: " Como casero, me encanta compartir mi espacio y ofrecer una experiencia acogedora. Como inquilino, disfruto descubriendo nuevos destinos.¡Bienvenidos a mi hogar o acompáñenme en mi próxima aventura!",
                registration_code: null,
                is_active: 1,
            },
            {
                email: "usuario6@example.com",
                name: "Usuario 6",
                password: await hashPassword("Usuario6."),
                avatar: "avatar6.jpg",
                bio: "En mi papel como casero, me apasiona abrir las puertas de mi hogar para que otros puedan disfrutar de momentos especiales durante sus viajes. Como inquilino, estoy siempre en búsqueda del alojamiento perfecto que brinde comodidad a mis experiencias. ¡Espero encontrarnos pronto, ya sea como anfitrión o huésped!",
                registration_code: null,
                is_active: 1,
            },
            {
                email: "usuario7@example.com",
                name: "Usuario 7",
                password: await hashPassword("Usuario7."),
                avatar: "avatar7.jpg",
                bio: "Estoy siempre en movimiento, explorando nuevos destinos y sumergiéndome en la cultura de cada lugar que visito.",
                registration_code: null,
                is_active: 1,
            },
            {
                email: "usuario8@example.com",
                name: "Usuario 8",
                password: await hashPassword("Usuario8."),
                avatar: "avatar8.jpg",
                bio: " En mi vida, disfruto compartiendo mi hogar con personas de todo el mundo y explorando nuevos destinos.",
                registration_code: "03c76d2a-e38a-464d-8f42-fb1730537f57",
                is_active: 0,
            },
            {
                email: "usuario9@example.com",
                name: "Usuario 9",
                password: await hashPassword("Usuario9."),
                avatar: "avatar9.jpg",
                bio: "Ofrezco un hogar acogedor y único para los visitantes.",
                registration_code: "0873b0a0-d710-4e3f-a3d1-31f1e4281d53",
                is_active: 0,
            },
            {
                email: "usuario10@example.com",
                name: "Usuario 10",
                password: await hashPassword("Usuario10."),
                avatar: "avatar10.jpg",
                bio: "Busco lugares que inspiren y enriquezcan mis experiencias.",
                registration_code: "6baa4df6-f7cc-49c2-9c31-0097b38d19dc",
                is_active: 0,
            },
        ]

        const usersQueryList = []
        for (const {
            email,
            name,
            password,
            avatar,
            bio,
            registration_code,
            is_active,
        } of users) {
            // Para gestionar los nulos
            // const avatarValue = avatar ? `'${avatar}'` : null
            // const bioValue = bio ? `'${bio}'` : null
            const registrationCodeValue = registration_code
                ? `'${registration_code}'`
                : null

            usersQueryList.push(
                `('${email}', '${name}', '${password}', '${avatar}', '${bio}', ${registrationCodeValue}, ${is_active})`
            )
        }

        await connection.query(`
            INSERT INTO users(email, name, password, avatar, bio, registration_code, is_active)
            VALUES${usersQueryList.join(",")};
        `)

        console.log("---Añadiendo registros a la tabla properties---")
        await connection.query(`
            INSERT INTO properties (id, name, description, type, country, location, price, area, bedrooms, bathrooms, created_at, modified_at, owner_id)
            VALUES
            (1, 'Maravilloso apartamento', 'Apartamento situado en el centro de Sevilla, perfecto para uso turístico.', 'Apartamento', 'España', 'Sevilla', 80, 78, 2, 2, NOW(), NULL, 1),
            (2, 'Apartamento en pleno centro', 'A 1,5km del Boston Common, este apartamento es perfecto para conocer la ciudad.', 'Apartamento', 'Estados Unidos', 'Bostón', 150, 90, 3, 2, NOW(), NULL, 2),
            (3, 'Apartamento en Madrid', 'Se encuentra en el barrio de Chamberí, con todas las necesidades a menos de 5 minutos.', 'Apartamento', 'España', 'Madrid', 80, 42, 1, 1, NOW(), NULL, 3),
            (4, 'Casa en Irlanda', 'Situado en Dublín cerca de Bushy Park. Perfecto para hacer turismo.', 'Apartamento', 'Irlanda', 'Dublín', 70, 50, 2, 1, NOW(), NULL, 4),
            (5, 'Chalet estilo nórdico', 'Se encuentra en el barrio de Las Rozas en Madrid. Disfruta de la tranquilidad del campo sin perder las comodidades de la ciudad.', 'Chalet', 'España', 'Madrid', 120, 128, 3, 2, NOW(), NULL, 3),
            (6, 'Chalet pueblerino', 'Si necesitas tranquilidad, este es tu sitio.', 'Chalet', 'Finlandia', 'Tervola', 72, 150, 4, 2, NOW(), NULL, 5),
            (7, 'Propiedad en el norte de España', 'Perfecto para realizar fiestas o hacer turismo rural en Galicia.', 'Chalet', 'España', 'Oleiros', 45, 215, 5, 3, NOW(), NULL, 6),
            (8, 'Casa en Portugal', 'Ideal para descansar y realizar actividades al aire libre como senderismo o equitación.', 'Chalet', 'Portugal', 'Lisboa', 75, 150, 3, 2, NOW(), NULL, 6),
            (9, 'Casa rural en Boiro', 'Si quieres descansar, disfrutar de la tranquilidad del campo y del mar, no dudes en reservar.', 'Casa rural', 'España', 'Boiro', 112, 90, 3, 2, NOW(), NULL, 6),
            (10, 'Casita de madera', 'En pleno monte de Arderin, este lugar es perfecto para desconectar de la vida cotidiana y disfrutar de los placeres del aire libre.', 'Casa rural', 'Irlanda', 'Laois', 150, 52, 1, 1, NOW(), NULL, 4),
            (11, 'Casa rural cerca de Sierra Nevada ', 'A menos de media hora de Sierra Nevada. Si quieres realizar actividades al aire libre, contacta conmigo.', 'Casa rural', 'España', 'Guejar Sierra', 85, 90, 2, 2, NOW(), NULL, 1);   
        `)

        console.log("---Añadiendo registros a la tabla images---")
        await connection.query(`
            INSERT INTO images (id, name)
            VALUES
            (1, 'ap1_i1.jpg'),
            (2, 'ap1_i2.jpg'),
            (3, 'ap1_i3.jpg'),
            (4, 'ap2_i1.jpg'),
            (5, 'ap2_i2.jpg'),
            (6, 'ap2_i3.jpg'),
            (7, 'ap2_i4.jpg'),
            (8, 'ap2_i5.jpg'),
            (9, 'ap3_i1.jpg'),
            (10, 'ap4_i1.jpg'),
            (11, 'ap4_i2.jpg'),
            (12, 'ch1_i1.jpg'),
            (13, 'ch1_i2.jpg'),
            (14, 'ch1_i3.jpg'),
            (15, 'ch2_i1.jpg'),
            (16, 'ch2_i2.jpg'),
            (17, 'ch3_i1.jpg'),
            (18, 'ch3_i2.jpg'),
            (19, 'ch3_i3.jpg'),
            (20, 'ch4_i1.jpg'),
            (21, 'ch4_i2.jpg'),
            (22, 'ch4_i3.jpg'),
            (23, 'cr1_i1.jpg'),
            (24, 'cr1_i2.jpg'),
            (25, 'cr1_i3.jpg'),
            (26, 'cr2_i1.jpg'),
            (27, 'cr2_i2.jpg'),
            (28, 'cr2_i3.jpg'),
            (29, 'cr2_i4.jpg'),
            (30, 'cr3_i1.jpg'),
            (31, 'cr3_i2.jpg'),
            (32, 'cr3_i3.jpg');            
        `)

        console.log("---Añadiendo registros a la tabla properties_images---")
        await connection.query(`
            INSERT INTO properties_images (id, image_id, property_id)
            VALUES
            (1, 1, 1),
            (2, 2, 1),
            (3, 3, 1),
            (4, 4, 2),
            (5, 5, 2),
            (6, 6, 2),
            (7, 7, 2),
            (8, 8, 2),
            (9, 9, 3),
            (10, 10, 4),
            (11, 11, 4),
            (12, 12, 5),
            (13, 13, 5),
            (14, 14, 5),
            (15, 15, 6),
            (16, 16, 6),
            (17, 17, 7),
            (18, 18, 7),
            (19, 19, 7),
            (20, 20, 8),
            (21, 21, 8),
            (22, 22, 8),
            (23, 23, 9),
            (24, 24, 9),
            (25, 25, 9),
            (26, 26, 10),
            (27, 27, 10),
            (28, 28, 10),
            (29, 29, 10),
            (30, 30, 11),
            (31, 31, 11),
            (32, 32, 11);       
        `)

        console.log("---Añadiendo registros a la tabla bookings---")
        await connection.query(`
            INSERT INTO bookings (id, starting_date, ending_date, is_confirmed, created_at, tenant_id, property_id)
            VALUES
            (1, '2024-04-26', '2024-04-28', 1, NOW(), 2, 1),
            (2, '2024-04-15', '2024-04-21', 1, NOW(), 2, 11),
            (3, '2024-04-26', '2024-04-28', 1, NOW(), 4, 11),
            (4, '2024-04-22', '2024-04-24', 1, NOW(), 5, 3),
            (5, '2024-04-15', '2024-04-17', 1, NOW(), 6, 2),
            (6, '2024-05-01', '2024-05-05', 1, NOW(), 7, 9),
            (7, '2024-04-25', '2024-04-28', 1, NOW(), 7, 3),
            (8, '2024-05-03', '2024-05-05', 1, NOW(), 6, 4),
            (9, '2024-05-02', '2024-05-05', 1, NOW(), 7, 11),
            (10, '2024-05-10', '2024-05-12', 1, NOW(), 4, 6),
            (11, '2024-04-26', '2024-04-28', 0, NOW(), 6, 6),
            (12, '2024-04-15', '2024-04-17', 0, NOW(), 2, 6),
            (13, '2024-05-10', '2024-05-12', 0, NOW(), 5, 4),
            (14, '2024-05-17', '2024-05-19', 0, NOW(), 4, 2),
            (15, '2024-04-16', '2024-04-19', 0, NOW(), 7, 2),
            (16, '2024-02-23', '2024-02-25', 1, NOW(), 6, 3),
            (17, '2024-02-26', '2024-03-03', 1, NOW(), 4, 1),
            (18, '2024-04-27', '2024-04-30', 1, NOW(), 5, 3),
            (19, '2024-03-25', '2024-04-30', 1, NOW(), 7, 1),
            (20, '2024-03-25', '2024-03-27', 1, NOW(), 6, 11),
            (21, '2024-03-01', '2024-03-03', 1, NOW(), 2, 11),
            (22, '2024-02-01', '2024-02-08', 1, NOW(), 2, 6),
            (23, '2024-03-14', '2024-03-21', 1, NOW(), 7, 6),
            (24, '2024-03-13', '2024-03-21', 1, NOW(), 5, 8),
            (25, '2024-01-10', '2024-01-15', 1, NOW(), 6, 1),
            (26, '2024-01-10', '2024-01-15', 1, NOW(), 1, 5);
       `)
        console.log("---Añadiendo registros a la tabla reviews---")
        await connection.query(`
      INSERT INTO reviews (id, comment, rating, is_owner, created_at, modified_at, booking_id)
      VALUES
      (1, 'Casero agradable y la casa estaba impecable. Muy recomendable', '5', 0, NOW(), NULL, 20),
      (2, 'Inquilino muy agradable y limpio.', '4', 1, NOW(), NULL, 20),
      (3, 'Muy buena propiedad, aunque había muchos mosquitos.', '3', 0, NOW(), NULL, 23),
      (4, 'El inquilino no fue muy agradable a la entrada y se quejaba mucho.', '2', 1, NOW(), NULL, 23),
      (5, 'Todo muy limpio pero llegó una hora tarde.', '3', 1, NOW(), NULL, 24),
      (6, 'Propiedad estupenda, tranquila y muy bien cuidada.', '5', 0, NOW(), NULL, 22),
      (7, 'El casero fue muy majo y atento.', '4', 0, NOW(), NULL, 25),
      (8, 'El inquilino fue puntual y respetuoso.', '4', 1, NOW(), NULL, 26);   
    `)

        console.log("¡Registros añadidos con éxito!")
    } catch (err) {
        console.error("Error al añadir los registros:", err)
    } finally {
        if (connection) connection.release()
        process.exit()
    }
}

backupDb()
