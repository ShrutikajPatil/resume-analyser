import React from 'react';
import './JobDescriptionInput.css';

function JobDescriptionInput({ value, onChange, disabled }) {
  return (
    <div className="form-group">
      <label htmlFor="jobDescription">Job Description</label>
      <textarea
        id="jobDescription"
        value={value}
        onChange={onChange}
        placeholder="Paste the job description here..."
        rows="8"
        disabled={disabled}
        required
      />
    </div>
  );
}

export default JobDescriptionInput;
