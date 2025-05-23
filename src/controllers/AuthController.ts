import { Request, Response } from "express";
import { Usuario } from "../models/modeloUsuarios";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

class AuthController{

    static async register(req: Request, res: Response): Promise<any> {
        //registrarse

        try {
            const body = req.body
            const {nombreUsuario, clave} = body

            if (!nombreUsuario || !clave) {
                return res.status(400).json({
                    success: false, message: "Bad request"
                })
            } else {
                const hash = await bcrypt.hash(clave, 10 /*para que sea 
                    un hash largo (más seguro)*/)

                const nuevoUsuario = new Usuario({nombreUsuario, clave: hash})

                await nuevoUsuario.save()

                res.status(201).json({
                    success: true, 
                    data: {
                        _id: nuevoUsuario._id,
                        nombreUsuario: nuevoUsuario.nombreUsuario
                    }
                })
            }

        } catch (error) {
            const err= error as Error
            res.status(500).json({success: false, message: err.message})
        }

        //fin register
    }
        
    //-------------------------------------------------------------
       
    //inicio login

    static async login(req: Request, res: Response): Promise<any> {
        //entrar

        try {
            const body = req.body
            const {nombreUsuario, clave} = body

            // Verifica si faltan el nombre de usuario o la contraseña en la 
            // solicitud
            if (!nombreUsuario || !clave) {
                return res.status(404).json({ success: false, message: 
                "bad request" });
            } else {
                // Busca un usuario en la base de datos con el nombre de 
                // usuario proporcionado
                const usuarioEncontrado = await Usuario.findOne({ nombreUsuario });

                // Si no se encuentra el usuario, responde con "No autorizado"
                if (!usuarioEncontrado) {
                    return res.status(401).json({ success: false, 
                    message: "No autorizado" });
                } else {
                    // Compara la contraseña ingresada con la almacenada 
                    // en la base de datos
                    const claveValidada = await bcrypt.compare(clave, usuarioEncontrado.clave);

                    // Si la contraseña no coincide, responde con 
                    // "No autorizado"
                    if (!claveValidada) {
                        return res.status(401).json({ success: false, 
                        message: "No autorizado" });
                    } else{
                        // Obtiene la clave secreta para firmar el token desde 
                        // las variables de entorno
                        const JWT_SECRET = process.env.JWT_SECRET || "";

                        // Crea un token JWT con el ID y nombre de usuario, 
                        // válido por 1 hora
                        const token = jwt.sign(
                            {
                                id: usuarioEncontrado._id,
                                nombreUsuario: usuarioEncontrado.nombreUsuario
                            },
                            JWT_SECRET,
                            { expiresIn: "1 hour" }
                        );

                        // Devuelve el token al cliente si todo fue correcto
                        res.json({ success: true, data: {token} });

                    }
                }

            }//fin if/else

            //fin try/catch del login
        } catch (error) {
            const err= error as Error
            res.status(500).json({success: false, message: err.message})
        }
    }
}

export default AuthController