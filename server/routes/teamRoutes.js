import { Router } from 'express';
import Team from '../controllers/TeamController';

const { selectWeekLeaders } = Team;

const router = Router();

router.get('/leaders', selectWeekLeaders);

export default router;
