import React, { useState } from 'react';
import EditorComponent from './components/EditorComponent';
import OutputConsole from './components/OutputConsole';
import RunButton from './components/RunButton';
import ThemeToggle from './components/ThemeToggle';
import EventButtons from './components/EventButtons';
import './App.css';

/**
 * Main App Component
 * Manages global state including:
 * - Code editor content
 * - Console output
 * - Theme (dark/light mode)
 * - Defined events
 */
function App() {
  // State management
  const [code, setCode] = useState(`start {
    say "Welcome to EVENTRA!"
    say "This is an event-driven programming language"
}

on click {
    say "Button clicked!"
}

on login {
    input username
    say "Hello, " + username
}`);
  
  const [output, setOutput] = useState('');
  const [events, setEvents] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode by default
  
  /**
   * Toggle between dark and light theme
   */
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  /**
   * Update code content
   */
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };
  
  /**
   * Append output to console
   */
  const appendOutput = (text) => {
    setOutput(prev => prev + text);
  };
  
  /**
   * Clear the output console
   */
  const clearOutput = () => {
    setOutput('');
  };
  
  /**
   * Set available events
   */
  const setAvailableEvents = (eventList) => {
    setEvents(eventList);
  };
  
  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header */}
      <header className="app-header">
        <h1>EVENTRA</h1>
        <p className="subtitle">Event-Driven Programming Language</p>
        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
      </header>
      
      {/* Main Content */}
      <div className="main-content">
        {/* Left Panel - Editor */}
        <div className="editor-section">
          <div className="section-header">
            <h2>Code Editor</h2>
          </div>
          <EditorComponent 
            code={code} 
            onCodeChange={handleCodeChange}
            isDarkMode={isDarkMode}
          />
          <RunButton 
            code={code} 
            onOutput={appendOutput}
            onClear={clearOutput}
            onEventsDetected={setAvailableEvents}
            isDarkMode={isDarkMode}
          />
        </div>
        
        {/* Right Panel - Output & Events */}
        <div className="output-section">
          <div className="section-header">
            <h2>Output Console</h2>
          </div>
          <OutputConsole output={output} isDarkMode={isDarkMode} />
          
          <div className="section-header">
            <h2>Event Triggers</h2>
          </div>
          <EventButtons 
            events={events} 
            code={code}
            onOutput={appendOutput}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="app-footer">
        <p>Built with React & Spring Boot | EVENTRA © 2026</p>
      </footer>
    </div>
  );
}

export default App;
