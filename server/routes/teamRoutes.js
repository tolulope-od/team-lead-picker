import { Router } from 'express';
import Team from '../controllers/TeamController';

const { createWeekLeaders, selectAllWeekLeaders } = Team;

const router = Router();

router.get('/leaders', selectAllWeekLeaders);
router.post('/leaders', createWeekLeaders);

export default router;
