import {Router} from "express";
import {getRangosEdad,createRangoEdad,getRangoEdadById,updateRangoEdad,deleteRangoEdad} from "./rango_edad.controller.js";

const router=Router();

router.get("/",getRangosEdad);
router.post("/",createRangoEdad);
router.get("/:id",getRangoEdadById);
router.put("/:id",updateRangoEdad);
router.delete("/:id",deleteRangoEdad);

export default router;
