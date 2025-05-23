// http://localhost:1234/api/socios

import { Router } from "express";
import ControlSocios from "../controllers/controlSocios";

const sociosRouter = Router()

sociosRouter.get("/", ControlSocios.getAllSocios)
sociosRouter.get("/:id", ControlSocios.getSocio)
sociosRouter.post("/", ControlSocios.crearNuevoSocio)
sociosRouter.patch("/:id", ControlSocios.actualizarSocio)
sociosRouter.delete("/:id", ControlSocios.borrarSocio)

export {sociosRouter}