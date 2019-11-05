import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const router = new Router();

router.post('/sessions', SessionController.store);

router.use(authMiddleware);
router.post('/student',     StudentController.store);
router.put('/student/:id', StudentController.update);

export default router;
