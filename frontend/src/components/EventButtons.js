import React, { useState } from 'react';
import axios from 'axios';

/**
 * EventButtons - Dynamic buttons to trigger events
 * Creates buttons based on detected events in code
 */
const EventButtons = ({ events, code, onOutput, isDarkMode }) => {
  const [isLoading, setIsLoading] = useState(null); // Track which event is loading
  
  // Backend API base URL
  const API_BASE_URL = 'http://localhost:8080/api';
  
  /**
   * Trigger a specific event
   */
  const handleTriggerEvent = async (eventName) => {
    if (!code || code.trim() === '') {
      alert('Please enter some code first');
      return;
    }
    
    setIsLoading(eventName);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/trigger`, {
        eventName: eventName,
        code: code
      });
      
      if (response.data.success) {
        onOutput(response.data.output);
      } else {
        onOutput(`Error: ${response.data.error || 'Failed to trigger event'}`);
      }
      
    } catch (err) {
      console.error('Error triggering event:', err);
      onOutput(`Error triggering event '${eventName}': ${err.message}`);
    } finally {
      setIsLoading(null);
    }
  };
  
  return (
    <div className="event-buttons-container" style={{
      flex: 1,
      padding: '1rem',
      backgroundColor: isDarkMode ? '#2d2d44' : '#ffffff',
      borderRadius: '8px',
      border: '2px solid var(--border-color)',
      minHeight: '150px'
    }}>
      {events.length === 0 ? (
        <p style={{ 
          color: 'var(--text-secondary)', 
          textAlign: 'center',
          fontStyle: 'italic',
          padding: '2rem'
        }}>
          No events defined. Add "on eventName { }" blocks to your code.
        </p>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          {events.map((eventName) => (
            <button
              key={eventName}
              onClick={() => handleTriggerEvent(eventName)}
              disabled={isLoading === eventName}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.95rem',
                fontWeight: '600',
                backgroundColor: isLoading === eventName ? '#6a6a8a' : 'var(--accent-color)',
                color: isDarkMode ? '#1a1a2e' : '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: isLoading === eventName ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '120px',
                opacity: isLoading === eventName ? 0.6 : 1,
                transform: isLoading === eventName ? 'scale(0.98)' : 'scale(1)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            >
              {isLoading === eventName ? '⏳ Running...' : `⚡ ${eventName}`}
            </button>
          ))}
        </div>
      )}
      
      {/* Info Text */}
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: isDarkMode ? '#3d3d5c' : '#f0f0f0',
        borderRadius: '6px',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)'
      }}>
        <strong>💡 Tip:</strong> Events are automatically detected from your code. 
        The "start" event runs automatically when you click "Run Code".
      </div>
    </div>
  );
};

export default EventButtons;
