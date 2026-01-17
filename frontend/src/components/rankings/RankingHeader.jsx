import React from 'react';
import { getScoreColor, formatDate } from '../../utils/scoreUtils';
import './RankingHeader.css';

function RankingHeader({ analysis, index }) {
  return (
    <div className="ranking-header">
      <div className="ranking-position">
        <span className="position-number">#{index + 1}</span>
      </div>
      <div className="ranking-info">
        <h3>{analysis.fileName || 'Resume'}</h3>
        <p className="ranking-date">{formatDate(analysis.timestamp)}</p>
      </div>
      <div
        className="ranking-score"
        style={{ color: getScoreColor(analysis.score) }}
      >
        {analysis.score}/100
      </div>
    </div>
  );
}

export default RankingHeader;
