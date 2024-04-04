import { Resend } from "resend"
import { PORT, RESEND_API_KEY } from "../config/env.js"

const sendBookingNotificationEmail = (email, property) => {
    const resend = new Resend(RESEND_API_KEY)
    resend.emails.send({
        from: "heflu@resend.dev",
        to: [email],
        subject: "Nueva reserva",
        html: `<h1>Buenas, has recibido una nueva reserva</h1>
        <h2><em><strong>${property.name} - ${property.location}</strong></em></h2>
        <p><strong>Comprueba en el siguiente enlace tus reservas pendientes</strong></p>
        <h1><span style="text-decoration: underline;"><a href="http://localhost:${PORT}/bookings/">RESERVAS</a></span></h1>
        <h2>HEFLÚ</h2>`,
    })
}

export default sendBookingNotificationEmail
