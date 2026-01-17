import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Analyze resume against job description using AI
 */
export async function analyzeResume(resumeText, jobDescription) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
  }

  const prompt = `You are an expert resume analyzer. Analyze the following resume against the job description and provide:

1. A match score from 0-100 (where 100 is a perfect match)
2. A concise explanation (2-3 sentences) of why this score was given, highlighting strengths and gaps
3. Specific recommendations (3-5 bullet points) on how to improve the resume to better match the job description

Resume:
${resumeText}

Job Description:
${jobDescription}

Respond in the following JSON format:
{
  "score": <number between 0-100>,
  "explanation": "<2-3 sentence explanation>",
  "recommendations": ["<recommendation 1>", "<recommendation 2>", ...]
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert resume analyzer. Always respond with valid JSON only, no additional text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const responseText = completion.choices[0].message.content;
    const analysis = JSON.parse(responseText);

    // Validate and ensure score is between 0-100
    analysis.score = Math.max(0, Math.min(100, parseInt(analysis.score) || 0));
    
    // Ensure explanation exists
    if (!analysis.explanation) {
      analysis.explanation = "Analysis completed.";
    }

    // Ensure recommendations is an array
    if (!Array.isArray(analysis.recommendations)) {
      analysis.recommendations = [];
    }

    return analysis;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error(`Failed to analyze resume: ${error.message}`);
  }
}
