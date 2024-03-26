import { Resend } from "resend"
import { PORT, RESEND_API_KEY } from "../config/env.js"

const sendRegistrationCodeEmail = (email, registration_code) => {
    const resend = new Resend(RESEND_API_KEY)
    resend.emails.send({
        from: "heflu@resend.dev",
        to: [email],
        subject: "Activación de cuenta",
        html: `<h1>Buenas, te has registrado correctamente</h1>
        <h3><em>Solo queda un pequeño paso,</em></h3>
        <p><strong>Activa tu cuenta en el siguiente enlace</strong></p>
        <h1><span style="text-decoration: underline;"><a href="http://localhost:${PORT}/users/validate/${registration_code}">ACTIVAR</a></span></h1>
        <h2>¡Date prisa!</h2>
        <p><em><strong>¡Tus vacaciones de ensueño te esperan!</strong></em></p>
        <h2>HEFLÚ</h2>`,
    })
}

export default sendRegistrationCodeEmail
