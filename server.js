import express from "express"
import cors from "cors"
import morgan from "morgan"

import { PORT } from "#config/env"

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("common"))

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`)
})
