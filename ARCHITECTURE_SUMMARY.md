# System Architecture & Technical Decisions Summary

<!--  Architecture Overview -->

**The Resume Analyser project is built using a three-layer (three-tier) architecture.**

1) **Backend Structure (Node.js + Express)**

    1) Routes - Routes handle incoming API requests. They decide which API is called and apply middlewares if needed.

    2) Controllers - Controllers handle request and response logic. They receive data from   routes, call the required service, and send the final response to the frontend.

    3) Services-Services contain the main business logic of the application.
    This includes: Resume and JD text extraction, AI-based resume analysis, Score calculation
    Data storage handling

2) **Data Storage**
   - Instead of using a database, the backend uses JSON file storage.
   - This keeps the project simple and lightweight
   - No database setup is required
   - Data is still stored permanently
   - Easy to move or deploy the project anywhere 

3) **Frontend Structure (React + Vite)**
   1) The frontend is built using React with Vite and follows a feature-based folder structure.
 
   2) Main folders include:
      analyzer – resume and job description analysis UI
      rankings – showing scores and comparisons
      layout – common layout components like header and footer
      common – reusable UI components

    3) This structure helps in reusing components,keeping code clean ,easy maintenance



<!--  AI Tool Selection & Reasoning -->

**Model used for resume analysis is OpenAI’s GPT-4o-mini**
- I use OpenAI’s GPT-4o-mini model through the Chat Completions API to analyze resumes.
- This AI model reads the resume and job description and gives smart analysis.

**Why GPT-4o-mini was chosen**

I selected GPT-4o-mini because it is:

1) Low cost

2) Fast

3) Gives good quality results

- This makes it perfect for an MVP or small project, where we want good output without high cost.

**What the model does**

- The model has strong understanding of human language, so it can:

- Compare resume and job description

- Find matching skills

- Identify missing skills

- Suggest what the candidate should improve

**How consistency is maintained**

- I use Structured JSON output, Temperature set to 0.3
- Lower temperature means: Less randomness, More stable and accurate results, Same input gives almost same output.This is important for reliable scoring.

**Prompt design**

- Our prompt is designed to give three clear outputs:
1) Match score (0–100) – how well resume matches the job

2) Short explanation – strengths and missing areas

3) Improvement suggestions – what to add or improve

All outputs come in JSON format, so backend can easily read it ,frontend can easily display it ,no parsing issues.
