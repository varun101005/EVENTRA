import React, { useEffect, useRef } from 'react';

/**
 * OutputConsole - Displays program output like a terminal
 * Auto-scrolls to show latest output
 */
const OutputConsole = ({ output, isDarkMode }) => {
  const consoleRef = useRef(null);
  
  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [output]);
  
  return (
    <div 
      ref={consoleRef}
      className="output-console"
      style={{
        flex: 1,
        minHeight: '200px',
        maxHeight: '300px',
        backgroundColor: isDarkMode ? '#1a1a2e' : '#f0f0f0',
        border: '2px solid var(--border-color)',
        borderRadius: '8px',
        padding: '1rem',
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: '14px',
        overflowY: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        color: isDarkMode ? '#9ece6a' : '#333333',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
      }}
    >
      {output || 'Output will appear here...'}
    </div>
  );
};

export default OutputConsole;
