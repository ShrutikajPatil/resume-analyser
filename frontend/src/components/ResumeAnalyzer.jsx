import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './analyzer/FileUpload';
import JobDescriptionInput from './analyzer/JobDescriptionInput';
import SubmitButton from './analyzer/SubmitButton';
import AnalysisResult from './analyzer/AnalysisResult';
import ErrorMessage from './common/ErrorMessage';
import './ResumeAnalyzer.css';

function ResumeAnalyzer() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!resumeFile) {
      setError('Please select a resume file');
      return;
    }

    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await axios.post('/api/resume/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze resume. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-analyzer">
      <form onSubmit={handleSubmit} className="analyzer-form">
        <FileUpload
          onFileChange={handleFileChange}
          selectedFile={resumeFile}
          disabled={loading}
        />

        <JobDescriptionInput
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          disabled={loading}
        />

        <SubmitButton loading={loading} disabled={loading} />

        <ErrorMessage message={error} />
      </form>

      <AnalysisResult result={result} />
    </div>
  );
}

export default ResumeAnalyzer;
