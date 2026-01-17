# Backend API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
# Option 1: Use the setup script
npm run setup-env

# Option 2: Create manually (see CREATE_ENV.md for details)
```

3. Add your OpenAI API key to `.env`:
   - Open the `.env` file
   - Replace `your_openai_api_key_here` with your actual OpenAI API key
   - Get your API key from https://platform.openai.com/api-keys

4. Start the server:
```bash
npm start
# or
npm run dev  # with nodemon for auto-reload
```

## API Endpoints

- `POST /api/resume/analyze` - Analyze a resume
- `GET /api/resume/analyses` - Get all analyses
- `GET /api/resume/analyses/:id` - Get specific analysis
- `GET /health` - Health check

## Architecture

### Controllers
- **resumeController.js**: Request handlers for resume analysis endpoints

### Services
- **analysisService.js**: Handles AI-powered resume analysis using OpenAI
- **fileParserService.js**: Extracts text from PDF and text files
- **databaseService.js**: Manages JSON file storage operations

### Routes
- **resumeRoutes.js**: API route definitions (routing only, no business logic)
