import { Router } from 'express';
import teamRoutes from './teamRoutes';

const router = Router();

router.get('/', (req, res) =>
  res.status(200).json({ status: 'success', message: 'Team Lead Picker API Base' })
);

router.use('/team', teamRoutes);

export default router;
