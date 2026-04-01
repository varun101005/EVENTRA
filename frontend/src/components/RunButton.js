import React, { useState } from 'react';
import axios from 'axios';

/**
 * RunButton - Button to execute EVENTRA code
 * Sends code to backend and handles response
 */
const RunButton = ({ code, onOutput, onClear, onEventsDetected, isDarkMode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Backend API base URL
  const API_BASE_URL = 'http://localhost:8080/api';
  
  /**
   * Execute code by sending to backend
   */
  const handleRun = async () => {
    if (!code || code.trim() === '') {
      setError('Please enter some code to run');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    onClear();
    
    try {
      // Step 1: Get defined events
      const eventsResponse = await axios.post(`${API_BASE_URL}/events`, {
        code: code
      });
      
      if (eventsResponse.data.success) {
        const events = eventsResponse.data.events || [];
        onEventsDetected(events.filter(e => e !== 'start')); // Exclude 'start' as it auto-runs
      }
      
      // Step 2: Execute the code
      const runResponse = await axios.post(`${API_BASE_URL}/run`, {
        code: code
      });
      
      if (runResponse.data.success) {
        onOutput(runResponse.data.output);
      } else {
        setError(runResponse.data.error || 'Execution failed');
      }
      
    } catch (err) {
      console.error('Error executing code:', err);
      if (err.response) {
        setError(`Server error: ${err.response.data.message || err.message}`);
      } else if (err.request) {
        setError('Cannot connect to backend server. Make sure it\'s running on port 8080.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="run-button-container" style={{ 
      display: 'flex', 
      gap: '1rem', 
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: isDarkMode ? '#2d2d44' : '#ffffff',
      borderRadius: '8px',
      border: '2px solid var(--border-color)'
    }}>
      {/* Run Button */}
      <button
        onClick={handleRun}
        disabled={isLoading}
        className={`run-button ${isLoading ? 'loading' : ''}`}
        style={{
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          fontWeight: '600',
          backgroundColor: isLoading ? '#6a6a8a' : 'var(--success-color)',
          color: isDarkMode ? '#1a1a2e' : '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
          opacity: isLoading ? 0.6 : 1
        }}
      >
        {isLoading ? 'Running...' : '▶ Run Code'}
      </button>
      
      {/* Clear Button */}
      <button
        onClick={onClear}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: '600',
          backgroundColor: isDarkMode ? '#4a4a6a' : '#e0e0e0',
          color: isDarkMode ? '#ffffff' : '#1a1a2e',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        🗑 Clear Output
      </button>
      
      {/* Error Message */}
      {error && (
        <div className="error-message" style={{
          padding: '0.75rem 1rem',
          backgroundColor: 'rgba(247, 118, 142, 0.1)',
          borderLeft: '4px solid var(--error-color)',
          borderRadius: '4px',
          color: 'var(--error-color)',
          fontSize: '0.9rem',
          marginLeft: 'auto'
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default RunButton;
