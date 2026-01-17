import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataDir = join(__dirname, '../data');
const jsonFilePath = join(dataDir, 'analyses.json');

/**
 * Initialize storage - create data directory and JSON file if they don't exist
 */
export function initDatabase() {
  return new Promise((resolve, reject) => {
    try {
      // Create data directory if it doesn't exist
      if (!existsSync(dataDir)) {
        mkdirSync(dataDir, { recursive: true });
      }

      // Create JSON file with empty array if it doesn't exist
      if (!existsSync(jsonFilePath)) {
        writeFileSync(jsonFilePath, JSON.stringify([], null, 2), 'utf-8');
      }

      console.log('JSON storage initialized successfully');
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Read all analyses from JSON file
 */
function readAnalyses() {
  try {
    if (!existsSync(jsonFilePath)) {
      return [];
    }
    const data = readFileSync(jsonFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading analyses:', error);
    return [];
  }
}

/**
 * Write analyses to JSON file
 */
function writeAnalyses(analyses) {
  try {
    writeFileSync(jsonFilePath, JSON.stringify(analyses, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing analyses:', error);
    throw error;
  }
}

/**
 * Save analysis to JSON storage
 */
export function saveAnalysis(analysis) {
  return new Promise((resolve, reject) => {
    try {
      const analyses = readAnalyses();
      
      // Generate new ID (highest existing ID + 1, or 1 if empty)
      const newId = analyses.length > 0 
        ? Math.max(...analyses.map(a => a.id)) + 1 
        : 1;

      const newAnalysis = {
        id: newId,
        resumeText: analysis.resumeText,
        jobDescription: analysis.jobDescription,
        score: analysis.score,
        explanation: analysis.explanation,
        recommendations: analysis.recommendations || [],
        fileName: analysis.fileName,
        timestamp: new Date().toISOString()
      };

      analyses.push(newAnalysis);
      writeAnalyses(analyses);

      resolve(newAnalysis);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Get all analyses, sorted by score descending
 */
export function getAllAnalyses() {
  return new Promise((resolve, reject) => {
    try {
      const analyses = readAnalyses();
      
      // Sort by score descending, then by timestamp descending
      const sorted = analyses.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return new Date(b.timestamp) - new Date(a.timestamp);
      });

      resolve(sorted);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Get analysis by ID
 */
export function getAnalysisById(id) {
  return new Promise((resolve, reject) => {
    try {
      const analyses = readAnalyses();
      const analysis = analyses.find(a => a.id === parseInt(id));
      resolve(analysis || null);
    } catch (error) {
      reject(error);
    }
  });
}
