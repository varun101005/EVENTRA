import React from 'react';

/**
 * ThemeToggle - Toggle between dark and light mode
 */
const ThemeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      style={{
        padding: '0.6rem 1.2rem',
        fontSize: '0.95rem',
        fontWeight: '600',
        backgroundColor: isDarkMode ? '#f0c040' : '#4a4a6a',
        color: isDarkMode ? '#1a1a2e' : '#ffffff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        minWidth: '140px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
      }}
    >
      {isDarkMode ? (
        <>
          <span style={{ fontSize: '1.2rem' }}>☀️</span>
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <span style={{ fontSize: '1.2rem' }}>🌙</span>
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
