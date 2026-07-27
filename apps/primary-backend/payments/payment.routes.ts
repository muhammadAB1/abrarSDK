import express from 'express'
import { credits } from './payment.controller';
import { authMiddleware } from '../auth.middleware';

const router = express.Router();

router.post('/credits', authMiddleware, credits)

export default router