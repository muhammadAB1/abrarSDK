import express from 'express'
import { getModels, getProviders, getModelProviders } from './models.controller';
import { authMiddleware } from '../middleware';


const router = express.Router();


router.get('/models', getModels)
router.get('/providers', getProviders)
router.get('/mapping/:modelId/providers', getModelProviders)


export default router