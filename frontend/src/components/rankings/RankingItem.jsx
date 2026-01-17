import React from 'react';
import RankingHeader from './RankingHeader';
import RankingDetails from './RankingDetails';
import './RankingItem.css';

function RankingItem({ analysis, index }) {
  return (
    <div className="ranking-item">
      <RankingHeader analysis={analysis} index={index} />
      <RankingDetails analysis={analysis} />
    </div>
  );
}

export default RankingItem;
