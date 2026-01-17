import pdfParse from 'pdf-parse';
import { readFile } from 'fs/promises';
import { unlink } from 'fs/promises';

/**
 * Extract text from PDF file
 */
export async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = await readFile(filePath);
    const data = await pdfParse(dataBuffer);
    
    // Clean up file
    await unlink(filePath).catch(() => {});
    
    return data.text;
  } catch (error) {
    // Clean up file even on error
    await unlink(filePath).catch(() => {});
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
}

/**
 * Extract text from plain text file
 */
export async function extractTextFromFile(filePath) {
  try {
    const text = await readFile(filePath, 'utf-8');
    
    // Clean up file
    await unlink(filePath).catch(() => {});
    
    return text;
  } catch (error) {
    // Clean up file even on error
    await unlink(filePath).catch(() => {});
    throw new Error(`Failed to read file: ${error.message}`);
  }
}
