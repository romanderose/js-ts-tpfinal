import { Schema, model } from "mongoose";

/*Esquema que define los datos requeridos de los socios del club 
para guardarlos en la bd*/ 

const esquemaUsuario = new Schema({
    nombreUsuario: { type: String, required: true, unique: true },
    clave: { type: String, required: true }
}, {
    versionKey: false
})

const Usuario = model("Usuario", esquemaUsuario)

export {Usuario}