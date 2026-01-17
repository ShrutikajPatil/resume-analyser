import React from 'react';
import './EmptyState.css';

function EmptyState({ message, icon = '📋' }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
