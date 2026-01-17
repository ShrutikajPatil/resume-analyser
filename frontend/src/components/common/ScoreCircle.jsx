import React from 'react';
import { getScoreColor } from '../../utils/scoreUtils';
import './ScoreCircle.css';

function ScoreCircle({ score }) {
  return (
    <div
      className="score-circle"
      style={{ borderColor: getScoreColor(score) }}
    >
      <span className="score-value">{score}</span>
      <span className="score-max">/ 100</span>
    </div>
  );
}

export default ScoreCircle;
