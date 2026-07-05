import express from 'express';
import { getQualitySteps } from '../controllers/qualityStep.controller.js';

const router = express.Router();
router.get('/', getQualitySteps);

export default router;
