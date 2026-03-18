import express from 'express'
import { createApiKey, deleteApiKey, getApiKey, updateApiKey } from './apiKeys.controller';
import { authMiddleware } from '../middleware';


const router = express.Router();

router.post('/', authMiddleware, createApiKey);
router.get('/', authMiddleware, getApiKey)
router.put('/', authMiddleware, updateApiKey)
router.delete('/:id', authMiddleware, deleteApiKey)

export default router