import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = 
(req: Request, res: Response, next: NextFunction): any => {
    const JWT_SECRET = process.env.JWT_SECRET || "test"
    const authHeader = req.headers["authorization"]
    const token = authHeader?.split(" ")[1]

    if (!token) return res.status(401).json({
        success: false, 
        message: "no autorizado"
    }) 
    
    jwt.verify(token, JWT_SECRET, (err,usuario) =>{
        if (err) return res.status(403).json({
            success: false, 
            message:"token inválido"
        }) 
        
        //req.usuario = usuario
        next()  
        
    })

}