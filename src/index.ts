import express from "express";
import { connectMongoDB } from "./config/mongo";
import { sociosRouter } from "./routes/sociosRouter";
import { authRouter } from "./routes/authRouter";
import { authMiddleware } from "./middlewares/authMiddleware";

process.loadEnvFile()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/socios", authMiddleware, sociosRouter)

app.listen(PORT, () => {
    console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
    connectMongoDB() 
})