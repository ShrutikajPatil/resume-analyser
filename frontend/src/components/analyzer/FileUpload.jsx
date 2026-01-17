import React from 'react';
import './FileUpload.css';

function FileUpload({ onFileChange, selectedFile, disabled }) {
  return (
    <div className="form-group">
      <label htmlFor="resume">Resume File (PDF or Text)</label>
      <input
        type="file"
        id="resume"
        accept=".pdf,.txt"
        onChange={onFileChange}
        disabled={disabled}
      />
      {selectedFile && (
        <p className="file-name">Selected: {selectedFile.name}</p>
      )}
    </div>
  );
}

export default FileUpload;
