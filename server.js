import express from "express"
import fileUpload from "express-fileupload"
import cors from "cors"
import morgan from "morgan"

import { PORT, UPLOADS_DIR } from "./config/env.js"
import isAuth from "./middlewares/isAuth.js"

import userRoutes from "./api/userRoutes.js"
import propertiesRoutes from "./api/propertiesRoutes.js"
import bookingsRoutes from "./api/bookingsRoutes.js"
import reviewsRoutes from "./api/reviewsRoutes.js"
const app = express()

app.use(express.json())
app.use(fileUpload())
app.use(cors())
app.use(morgan("common"))
app.use(express.static(UPLOADS_DIR))

// Middleware que gestiona el token
app.use(isAuth)

//--- Rutas ---///
app.use("/users", userRoutes)
app.use("/properties", propertiesRoutes)
app.use("/bookings", bookingsRoutes)
app.use("/reviews", reviewsRoutes)
// Middleware ruta no encontrada
app.use((req, res) => {
    res.status(404)
    res.send({ status: 404, message: "Página no encontrada" })
})

// Middlewawre de error
app.use((err, req, res, next) => {
    res.status(err.httpStatus || 500).send({
        status: err.httpStatus,
        message: err.message,
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`)
})
