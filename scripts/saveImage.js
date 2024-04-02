import path from "path"
import fs from "fs/promises"

import { randomUUID } from "crypto"
import sharp from "sharp"

import { UPLOADS_DIR } from "../config/env.js"

const saveImage = async (image, size) => {
    const uploadsPath = path.join(process.cwd(), UPLOADS_DIR)

    // Esto se asegura de que existe la carpeta donde se guardarán los archivos y si no, la crea.
    try {
        await fs.access(uploadsPath)
    } catch {
        fs.mkdir(uploadsPath)
    }
    // Convierte en un objeto Sharp la imagen.
    const sharpImage = sharp(image.data)
    // Reescala la imagen al tamaño deseado en píxeles.
    if (size) sharpImage.resize(size)

    // Le genera un nombre aleatorio.
    const newImageName = `${randomUUID()}.jpg`
    const newImageFullPath = path.join(uploadsPath, newImageName)

    // La guarda en la carpeta especificada
    await sharpImage.toFile(newImageFullPath)

    // Devuelve el nombre para guardarla en la base de datos.
    return newImageName
}
export default saveImage
