import React from 'react';
import ScoreDisplay from './ScoreDisplay';
import ExplanationDisplay from './ExplanationDisplay';
import RecommendationsList from './RecommendationsList';
import './AnalysisResult.css';

function AnalysisResult({ result }) {
  if (!result) return null;

  return (
    <div className="result-container">
      <ScoreDisplay score={result.score} />
      <ExplanationDisplay explanation={result.explanation} />
      <RecommendationsList recommendations={result.recommendations} />
    </div>
  );
}

export default AnalysisResult;
