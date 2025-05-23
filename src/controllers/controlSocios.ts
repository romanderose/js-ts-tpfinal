import { Request, Response } from "express";
import { Socio } from "../models/modeloSocios";
import { InterfazSocio } from "../interface/InterfazSocio";

class ControlSocios {

    //para mostrar todos los socios y toda su información
    static async getAllSocios (req: Request, res: Response): Promise<any> {
        try {
            const socios = await Socio.find()

            res.json({
                success: true,
                data: socios
            })
        } catch (error) {
            const err = error as Error

            res.json({
                success: false,
                message: err.message
            })
        }
    }

    //------------------------------------------------------------------------------------

    //para buscar un socio determinado por medio de su id 
    // y mostrar sus datos
    static async getSocio (req: Request, res: Response): Promise<any> {
        const id = req.params.id

        try {
            const socioEncontrado = await Socio.findById(id)

            if (!socioEncontrado){
                res.status(404).json({
                    success: false,
                    message: "Socio no encontrado"
                }) 
            } else{
                res.json({ success: true, data: socioEncontrado})
            }
            
        } catch (error) {
            const err = error as Error

            res.json({
                success: false,
                message: err.message
            })
        }
    }

    //------------------------------------------------------------------------------------
    //para crear un nuevo socio
    static async crearNuevoSocio (req: Request, res: Response): Promise<any> {
        try {
            const body = req.body

            const { nombre, apellido, fechaNacimiento, 
            edad, deporteQuePractica, aptoFisico} = body

            if (!nombre || !apellido || !edad ||
            !deporteQuePractica || !aptoFisico) {
                res.status(400).json({
                success: false, message: "Bad request" 
                /*El dato fechaNacimiento no lo puse para este condicional
                porque en el modelo no lo marqué como required, para crear
                el nuevo socio independientemente de si está o no esa
                información. */   
                })  
            } else{
                const nuevoSocio = new Socio({nombre, apellido, fechaNacimiento, 
                edad, deporteQuePractica, aptoFisico})

                nuevoSocio.save();

                res.status(201).json({success: true, data: nuevoSocio})

                /*
                Armé este contenido dentro del else porque si lo dejaba
                por afuera, me guardaba datos en la bd que no cumplían 
                exactamente con la condición dada en el if (por ejemplo, me
                guardaba datos con aptoFisico: false cuando lo armé para que 
                solo guarde aquellos que son true, aunque igual me mostraba el 
                error de que la condición no se estaba cumpliendo. Todo esto 
                usando la extensión rapid api). Ahora de esta forma, me 
                funciona correctamente, por lo que las demás funciones (excepto la de 
                getAllSocios que ahí no me hizo falta), decidí armarlas también 
                con if-else dentro del try.
                */
            }
            
        } catch (error) {
            const err = error as Error

            res.json({
                success: false,
                message: err.message
            })
        }
    }

    //------------------------------------------------------------------------------------
    //para actualizar los datos de un socio ya registrado
    static async actualizarSocio (req: Request, res: Response): Promise<any> {
        const id = req.params.id
        const body = req.body //para recuperar la información que quiero cambiar

        try {
            const socioActualizado = await Socio.findByIdAndUpdate(id, body, {new:true} /*Para evitar
            que me devuelva la infromación vieja al actualizar */)
            
            if (!socioActualizado) {
                res.status(404).json({success: false, message: "Socio no encontrado"})
            } else {
                res.json({
                    success: true, data: socioActualizado
                })
            }
        } catch (error) {
            const err = error as Error

            res.json({
                success: false,
                message: err.message
            })
        }
    }

    //------------------------------------------------------------------------------------
    //para borrar un socio
    static async borrarSocio (req: Request, res: Response): Promise<any> {
        const id= req.params.id
        try {
            const socioBorrado = await Socio.findByIdAndDelete(id)

            if (!socioBorrado) {
                res.status(404).json({success: false, message: "Socio no encontrado"})
            } else {
                res.json({
                    success: true, data: socioBorrado
                })
            }

        } catch (error) {
            const err = error as Error

            res.json({
                success: false,
                message: err.message
            })
        }
    }
    //fin clase control socios
}

export default ControlSocios