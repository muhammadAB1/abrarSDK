import express from 'express'
import { credits } from './payment.controller';
import { authMiddleware } from '../middleware';

const router = express.Router();

router.post('/credits', authMiddleware, credits)

export default router