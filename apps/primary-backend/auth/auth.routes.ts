import express from 'express'
import { credits, logout, me, signin, signup } from './auth.controller';
import { authMiddleware } from '../middleware';

const router = express.Router();

router.post('/login', signin);
router.post('/signup', signup);
router.post('/logout', logout);
router.get('/me', authMiddleware, me);
router.get('/credits', authMiddleware, credits)

export default router