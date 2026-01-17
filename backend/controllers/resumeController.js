import { analyzeResume } from '../services/analysisService.js';
import { saveAnalysis, getAllAnalyses, getAnalysisById } from '../services/databaseService.js';
import { extractTextFromPDF, extractTextFromFile } from '../services/fileParserService.js';

/**
 * Analyze a resume against a job description
 */
export async function analyzeResumeController(req, res) {
  try {
    const { jobDescription } = req.body;
    
    if (!jobDescription) {
      return res.status(400).json({ error: 'Job description is required' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    // Extract text from resume
    let resumeText;
    if (req.file.mimetype === 'application/pdf') {
      resumeText = await extractTextFromPDF(req.file.path);
    } else {
      resumeText = await extractTextFromFile(req.file.path);
    }

    // Analyze resume
    const analysis = await analyzeResume(resumeText, jobDescription);

    // Save to storage
    const savedAnalysis = await saveAnalysis({
      resumeText: resumeText.substring(0, 5000), // Store first 5000 chars
      jobDescription: jobDescription.substring(0, 5000),
      score: analysis.score,
      explanation: analysis.explanation,
      recommendations: analysis.recommendations || null,
      fileName: req.file.originalname
    });

    res.json({
      ...analysis,
      id: savedAnalysis.id,
      timestamp: savedAnalysis.timestamp
    });
  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ error: 'Failed to analyze resume', details: error.message });
  }
}

/**
 * Get all analyses (for rankings)
 */
export async function getAllAnalysesController(req, res) {
  try {
    const analyses = await getAllAnalyses();
    res.json(analyses);
  } catch (error) {
    console.error('Error fetching analyses:', error);
    res.status(500).json({ error: 'Failed to fetch analyses', details: error.message });
  }
}

/**
 * Get analysis by ID
 */
export async function getAnalysisByIdController(req, res) {
  try {
    const analysis = await getAnalysisById(req.params.id);
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }
    res.json(analysis);
  } catch (error) {
    console.error('Error fetching analysis:', error);
    res.status(500).json({ error: 'Failed to fetch analysis', details: error.message });
  }
}
