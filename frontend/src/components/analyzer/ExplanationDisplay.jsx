import React from 'react';
import './ExplanationDisplay.css';

function ExplanationDisplay({ explanation }) {
  return (
    <div className="explanation-section">
      <h3>Explanation</h3>
      <p>{explanation}</p>
    </div>
  );
}

export default ExplanationDisplay;
