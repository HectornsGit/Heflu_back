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
                bio: "¡Hola! Soy un apasionado de los viajes y la aventura. Me encanta explorar lugares nuevos, sumergirme en diferentes culturas y descubrir rincones mágicos por todo el mundo. Además, disfruto mucho practicando deportes al aire libre, como el senderismo y el buceo. ¡Cada viaje es una nueva experiencia que me llena de energía!",
                registration_code: null,
                is_active: 1,
            },
            {
                email: "usuario2@example.com",
                name: "Usuario 2",
                password: await hashPassword("Usuario2."),
                avatar: "avatar2.jpg",
                bio: "Soy una casera experimentada y me apasiona abrir las puertas de mi hogar a viajeros de todas partes del mundo. Disfruto brindando una experiencia acogedora y única a mis huéspedes, compartiendo historias y creando recuerdos inolvidables juntos. Además, me encanta cocinar y organizar pequeñas cenas temáticas para que todos se sientan como en casa. ¡Bienvenidos a mi espacio!",
                registration_code: null,
                is_active: 1,
            },
            {
                email: "usuario3@example.com",
                name: "Usuario 3",
                password: await hashPassword("Usuario3."),
                avatar: "avatar3.jpg",
                bio: "Soy una viajera entusiasta en busca de aventuras y lugares fascinantes para hospedarme. Me encanta sumergirme en nuevas culturas, explorar paisajes impresionantes y conocer gente interesante en cada rincón del mundo. Además, disfruto compartiendo mis experiencias de viaje a través de mi blog y redes sociales. ¡Cada nuevo destino es una emocionante oportunidad de crecimiento y descubrimiento!",
                registration_code: null,
                is_active: 1,
            },
            {
                email: "usuario4@example.com",
                name: "Usuario 4",
                password: await hashPassword("Usuario4."),
                avatar: "avatar4.jpg",
                bio: "Me encanta compartir mi hogar con turistas de todo el mundo para brindarles una experiencia acogedora. Disfruto de la oportunidad de conocer personas de diferentes culturas y compartir historias mientras les muestro los encantos de mi ciudad. Además, me apasiona la cocina y preparar platos típicos para mis huéspedes, ¡haciendo que se sientan como en casa desde el primer momento!",
                registration_code: null,
                is_active: 1,
            },
            {
                email: "usuario5@example.com",
                name: "Usuario 5",
                password: await hashPassword("Usuario5."),
                avatar: "avatar5.jpg",
                bio: "Como casera, disfruto compartiendo mi espacio y ofreciendo una experiencia acogedora a mis huéspedes. Como viajera, me encanta descubrir nuevos destinos y sumergirme en nuevas aventuras. ¡Bienvenid@s a mi hogar o acompáñenme en mi próxima aventura!",
                registration_code: null,
                is_active: 1,
            },
            {
                email: "usuario6@example.com",
                name: "Usuario 6",
                password: await hashPassword("Usuario6."),
                avatar: "avatar6.jpg",
                bio: "¡Hola! En mi papel como casero, me apasiona abrir las puertas de mi hogar para que otros puedan disfrutar de momentos especiales durante sus viajes. Como inquilino, estoy siempre en búsqueda del alojamiento perfecto que brinde comodidad a mis experiencias. ¡Espero encontrarnos pronto, ya sea como anfitrión o huésped, para compartir nuevas aventuras y crear recuerdos inolvidables juntos!",
                registration_code: null,
                is_active: 1,
            },
            {
                email: "usuario7@example.com",
                name: "Usuario 7",
                password: await hashPassword("Usuario7."),
                avatar: "avatar7.jpg",
                bio: "Estoy siempre en movimiento, explorando nuevos destinos y sumergiéndome en la cultura de cada lugar que visito. Como turista, busco experiencias auténticas y emocionantes en cada rincón del mundo. Ya sea como anfitrión o huésped, ¡espero cruzar caminos contigo y compartir nuestras aventuras!",
                registration_code: null,
                is_active: 1,
            },
            {
                email: "usuario8@example.com",
                name: "Usuario 8",
                password: await hashPassword("Usuario8."),
                avatar: "avatar8.jpg",
                bio: "¡Bienvenid@s a mi perfil! Me hace muy feliz compartir mi hogar con personas de todo el mundo pero también explorar nuevos destinos. Como anfitrión, me encanta proporcionar una experiencia acogedora e inolvidable a mis huéspedes. Como viajero, busco constantemente nuevas aventuras y oportunidades para sumergirme en diferentes culturas. ¡Espero tener la oportunidad de encontrarnos en mi hogar o en algún destino en el futuro!",
                registration_code: null,
                is_active: 1,
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
            (1, 'Maravilloso apartamento', 'Situado en el corazón de Sevilla, este apartamento es ideal para turistas. Su ubicación céntrica ofrece fácil acceso a bares, restaurantes y monumentos. El apartamento cuenta con comodidades, incluyendo una cocina totalmente equipada y aire acondicionado. Perfecto para una estancia cómoda y alucinante en la ciudad.', 'Apartamento', 'España', 'Sevilla', 80, 78, 2, 2, NOW(), NULL, 1),
            (2, 'Apartamento en pleno centro', 'Este acogedor apartamento, ubicado a solo 1,5 km del Boston Common, te brinda la ubicación perfecta para explorar la ciudad al máximo. Con su beneficiosa proximidad a una de las áreas más emblemáticas de Boston, tendrás fácil acceso a todas las atracciones principales, restaurantes y actividades culturales que la ciudad tiene para ofrecer. Ideal para aquellos que desean sumergirse en la vida urbana de Boston mientras disfrutan de un hogar acogedor y bien equipado para relajarse después de un día de aventuras.', 'Apartamento', 'Estados Unidos', 'Bostón', 150, 90, 3, 2, NOW(), NULL, 2),
            (3, 'Apartamento en Madrid', 'Situado en el céntrico barrio de Chamberí, este encantador apartamento ofrece todas las comodidades que necesitas a menos de 5 minutos. Con tiendas, restaurantes y servicios al alcance de la mano, tendrás todo lo que necesitas justo en tu vecindario. Ideal para aquellos que buscan la combinación perfecta entre conveniencia y vida urbana, este apartamento te brinda un hogar acogedor en el corazón de Chamberí.', 'Apartamento', 'España', 'Madrid', 80, 42, 1, 1, NOW(), NULL, 3),
            (4, 'Casa en Irlanda', 'Ubicado en Dublín, a un paso del encantador Bushy Park, este apartamento es la elección perfecta para aquellos que desean explorar la ciudad. Con una ubicación estratégica cerca de este pintoresco parque y a poca distancia de las principales atracciones turísticas de Dublín, tendrás la oportunidad de sumergirte por completo en la vida y la cultura de la ciudad. Ideal para aquellos que buscan una casa cómoda para sus paseos turísticos en Dublín.', 'Apartamento', 'Irlanda', 'Dublín', 70, 50, 2, 1, NOW(), NULL, 4),
            (5, 'Chalet estilo nórdico', 'Se encuentra en el barrio de Las Rozas en Madrid. Disfruta de la tranquilidad del campo sin perder las comodidades de la ciudad.', 'Chalet', 'España', 'Madrid', 120, 128, 3, 2, NOW(), NULL, 3),
            (6, 'Chalet pueblerino', 'Situado en Tervola, Finlandia, este acogedor chalet de campo es el refugio perfecto para aquellos que buscan tranquilidad y serenidad. Con su ubicación apartada en medio de la naturaleza finlandesa, este chalet ofrece un oasis de calma y paz. Ideal para aquellos que desean desconectar del ajetreo y el bullicio de la vida cotidiana y disfrutar de la tranquilidad del campo.', 'Chalet', 'Finlandia', 'Tervola', 72, 150, 4, 2, NOW(), NULL, 5),
            (7, 'Propiedad en el norte de España', 'Esta encantadora casa es perfecta tanto para organizar fiestas como para disfrutar del turismo rural en Galicia. Con un ambiente acogedor y unas instalaciones ideales para celebraciones, ofrece el escenario perfecto para reuniones sociales y crear momentos inolvidables. Además, su entorno rural te invita a explorar la belleza natural de Galicia y sumergirte en su encanto característico. Ideal para aquellos que buscan una combinación de diversión y tranquilidad en un entorno gallego auténtico.', 'Chalet', 'España', 'Oleiros', 45, 215, 5, 3, NOW(), NULL, 6),
            (8, 'Casa en Portugal', 'Situada en Portugal, este encantador chalet de campo es el lugar perfecto para desconectar y disfrutar de actividades al aire libre. Rodeada de un entorno natural impresionante, ofrece la oportunidad ideal para relajarse y participar en actividades al aire libre, como senderismo y equitación. Ya sea explorando los senderos cercanos o cabalgando por los alrededores, esta casa te invita a disfrutar de la tranquilidad y la belleza del campo portugués mientras te sumerges en experiencias únicas.', 'Chalet', 'Portugal', 'Lisboa', 75, 150, 3, 2, NOW(), NULL, 6),
            (9, 'Casa rural en Boiro', 'Si estás buscando un refugio para descansar y disfrutar de la paz del campo y del mar, esta encantadora casa en Boiro es la elección perfecta. Con una cocina totalmente equipada para preparar tus propias comidas, una acogedora chimenea para las noches frías y todas las comodidades que necesitas para una estancia confortable, aquí encontrarás el lugar ideal para relajarte y desconectar. No dudes en reservar y disfrutar de momentos inolvidables en este tranquilo rincón gallego.', 'Casa rural', 'España', 'Boiro', 112, 90, 3, 2, NOW(), NULL, 6),
            (10, 'Casita de madera', 'En pleno monte de Arderin, este lugar te ofrece la oportunidad perfecta para desconectar de la vida cotidiana y sumergirte en los placeres turismo rural. Con un entorno natural impresionante y todas las comodidades que necesitas para una estancia acogedora, aquí encontrarás el refugio ideal para recargar energías y disfrutar de la tranquilidad del entorno. No dudes en reservar y vivir una experiencia única en contacto con la naturaleza.', 'Casa rural', 'Irlanda', 'Laois', 150, 52, 1, 1, NOW(), NULL, 4),
            (11, 'Casa rural cerca de Sierra Nevada ', 'A menos de media hora de Sierra Nevada, este lugar te ofrece la oportunidad perfecta para disfrutar de actividades al aire libre, como el esquí. Con un entorno natural impresionante a tu alcance, esta casa cuenta con todas las comodidades que necesitas, incluyendo calefacción para mantenerte cálido y acogedor durante tu estancia. Contáctame ahora mismo y asegura tu escapada llena de aventuras en este pintoresco rincón.', 'Casa rural', 'España', 'Guejar Sierra', 85, 90, 2, 2, NOW(), NULL, 1);   
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
