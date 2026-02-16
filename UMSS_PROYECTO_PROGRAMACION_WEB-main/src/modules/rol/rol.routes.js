import { Router } from 'express';
import * as RolController from './rol.controller.js';

const router = Router();

router.post('/', RolController.create);
router.get('/', RolController.getAll);

export default router;
