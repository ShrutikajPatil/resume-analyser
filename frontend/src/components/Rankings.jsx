import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RankingItem from './rankings/RankingItem';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';
import EmptyState from './common/EmptyState';
import './Rankings.css';

function Rankings() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/resume/analyses');
      setAnalyses(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load rankings. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading rankings..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (analyses.length === 0) {
    return (
      <EmptyState
        message="No analyses yet. Analyze a resume to see rankings here."
        icon="📋"
      />
    );
  }

  return (
    <div className="rankings">
      <h2>Resume Rankings</h2>
      <p className="rankings-subtitle">Sorted by match score (highest first)</p>

      <div className="rankings-list">
        {analyses.map((analysis, index) => (
          <RankingItem key={analysis.id} analysis={analysis} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Rankings;
