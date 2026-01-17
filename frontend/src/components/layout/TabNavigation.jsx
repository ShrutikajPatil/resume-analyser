import React from 'react';
import './TabNavigation.css';

function TabNavigation({ activeTab, onTabChange }) {
  return (
    <nav className="tabs">
      <button
        className={activeTab === 'analyze' ? 'active' : ''}
        onClick={() => onTabChange('analyze')}
      >
        Analyze Resume
      </button>
      <button
        className={activeTab === 'rankings' ? 'active' : ''}
        onClick={() => onTabChange('rankings')}
      >
        Rankings
      </button>
    </nav>
  );
}

export default TabNavigation;
