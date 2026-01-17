import React from 'react';
import './RankingDetails.css';

function RankingDetails({ analysis }) {
  return (
    <div className="ranking-details">
      <div className="ranking-explanation">
        <strong>Analysis:</strong> {analysis.explanation}
      </div>

      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="ranking-recommendations">
          <strong>Recommendations:</strong>
          <ul>
            {analysis.recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RankingDetails;
