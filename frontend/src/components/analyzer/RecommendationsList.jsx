import React from 'react';
import './RecommendationsList.css';

function RecommendationsList({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="recommendations-section">
      <h3>Recommendations to Improve Match</h3>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationsList;
