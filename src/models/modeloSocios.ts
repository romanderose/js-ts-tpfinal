import { Schema, model } from "mongoose";
import { deportes } from "../utils/deportes";

/*Esquema que define los datos requeridos de los socios del club 
para guardarlos en la bd*/ 

const esquemaSocios = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    fechaNacimiento: { type: String },
    edad: { type: Number, required: true},
    deporteQuePractica: { type: String , required: true, enum: deportes},
    aptoFisico: { type: Boolean }
}, {
    versionKey: false
})

const Socio = model("Socio", esquemaSocios)

export {Socio}

