import React from 'react';
import './SubmitButton.css';

function SubmitButton({ loading, disabled }) {
  return (
    <button type="submit" disabled={disabled || loading} className="submit-button">
      {loading ? 'Analyzing...' : 'Analyze Resume'}
    </button>
  );
}

export default SubmitButton;
