import express from 'express'
import { credits, signin, signup } from './auth.controller';
import { authMiddleware } from '../middleware';

const router = express.Router();

router.post('/login', signin);
router.post('/signup', signup);
router.get('/credits', authMiddleware, credits)

export default router