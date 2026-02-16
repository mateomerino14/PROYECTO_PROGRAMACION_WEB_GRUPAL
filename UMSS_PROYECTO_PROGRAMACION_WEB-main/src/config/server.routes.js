import { Router } from 'express';
import HealthRoutes from '../modules/health/health.routes.js';
import RangoEdadRoutes from '../modules/rangoEdad/rango_edad.routes.js';
import NivelDificultadRoutes from '../modules/nivel_dificultad/nivel_dificultad.routes.js';
import CategoriaRoutes from '../modules/categoria/categoria.routes.js';
import SubcategoriaRoutes from '../modules/subcategoria/subcategoria.routes.js';
import RolRoutes from '../modules/rol/rol.routes.js';
import AuthRoutes from '../modules/auth/auth.routes.js';
import { verifyToken, restrictTo } from '../middlewares/auth.middleware.js';

const router = Router();

router.use('/api/auth', AuthRoutes);
router.use('/api', HealthRoutes);
router.use('/api/niveles-dificultad', verifyToken, NivelDificultadRoutes);

router.use('/api/rol', verifyToken, restrictTo('administrador'), RolRoutes);

router.use('/api/categorias', verifyToken, restrictTo('administrador', 'profesor'), CategoriaRoutes);
router.use('/api/subcategorias', verifyToken, restrictTo('administrador', 'profesor'), SubcategoriaRoutes);
router.use('/api/rangos-edad', RangoEdadRoutes);

router.use('/', (req, res) => {
  res.json({ message: 'Ejecutando servidor HTTP :v'});
});

router.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default router;
