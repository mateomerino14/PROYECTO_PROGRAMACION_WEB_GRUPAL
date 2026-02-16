import { Router } from 'express';
import * as HealthController from './health.controller.js';

const router = Router();

router.get('/health', HealthController.getHealthStatusController);

export default router;
