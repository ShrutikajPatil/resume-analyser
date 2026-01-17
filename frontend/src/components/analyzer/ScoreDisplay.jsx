import React from 'react';
import ScoreCircle from '../common/ScoreCircle';
import './ScoreDisplay.css';

function ScoreDisplay({ score }) {
  return (
    <div className="score-section">
      <h2>Match Score</h2>
      <ScoreCircle score={score} />
    </div>
  );
}

export default ScoreDisplay;
