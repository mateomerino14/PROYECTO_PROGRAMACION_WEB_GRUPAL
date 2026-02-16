import { Router } from 'express';
import * as CategoriaController from './categoria.controller.js';

const router = Router();

router.get('/', CategoriaController.getAllCategorias);
router.get('/:id', CategoriaController.getCategoriaById);
router.post('/', CategoriaController.createCategoria);
router.put('/:id', CategoriaController.updateCategoria);
router.delete('/:id', CategoriaController.deleteCategoria);

export default router;
