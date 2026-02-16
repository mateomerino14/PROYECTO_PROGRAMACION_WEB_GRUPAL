import { Router } from 'express';
import * as SubcategoriaController from './subcategoria.controller.js';

const router = Router();

router.get('/',SubcategoriaController.getAllSubcategorias);
router.get('/:id',SubcategoriaController.getSubcategoriaById);
router.post('/',SubcategoriaController.createSubcategoria);
router.put('/:id',SubcategoriaController.updateSubcategoria);
router.delete('/:id',SubcategoriaController.deleteSubcategoria);

export default router;
