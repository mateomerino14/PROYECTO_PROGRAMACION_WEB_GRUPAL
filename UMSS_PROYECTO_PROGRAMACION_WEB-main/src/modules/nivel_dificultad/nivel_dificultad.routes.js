import { Router } from "express";
import {getNivelesDificultad,createNivelDificultad,getNivelDificultadById,updateNivelDificultad,deleteNivelDificultad} from "./nivel_dificultad.controller.js";

const router=Router();
router.get("/",getNivelesDificultad);
router.post("/",createNivelDificultad);
router.get("/:id",getNivelDificultadById);
router.put("/:id",updateNivelDificultad);
router.delete("/:id",deleteNivelDificultad);

export default router;
