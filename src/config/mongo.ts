import mongoose from "mongoose";

process.loadEnvFile()

const URI_DB = process.env.URI_DB || ""

const connectMongoDB = async () => {
    try {
        await mongoose.connect(URI_DB)
        console.log("✅ Conexión con la base de datos exitosa.")
    } catch (error) {
        console.log("❌ Error al conectarse a la base de datos.")
    }
}

export {connectMongoDB}