import {Router} from 'express';
import * as AuthController from './auth.controller.js';
import { obtenerUsuarios } from './auth.controller.js';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/usuarios', obtenerUsuarios);

export default router;
