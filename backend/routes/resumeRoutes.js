import express from 'express';
import multer from 'multer';
import {
  analyzeResumeController,
  getAllAnalysesController
} from '../controllers/resumeController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Analyze resume endpoint
router.post('/analyze', upload.single('resume'), analyzeResumeController);

// Get all analyses (for rankings)
router.get('/analyses', getAllAnalysesController);


export default router;
