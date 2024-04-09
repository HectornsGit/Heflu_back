import path from "path"
import fs from "fs/promises"

import { UPLOADS_DIR } from "../config/env.js"

const deleteImageFolderFromServer = async () => {
    try {
        const uploadsPath = path.join(process.cwd(), UPLOADS_DIR)

        await fs.access(uploadsPath)

        fs.rm(uploadsPath, { recursive: true })
    } catch (error) {
        console.error(error.message)
    }
}

deleteImageFolderFromServer()
export default deleteImageFolderFromServer
