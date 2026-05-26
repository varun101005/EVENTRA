import React, {
  useState,
  useEffect,
  useCallback
} from 'react';

import EditorComponent from './components/EditorComponent';
import OutputConsole from './components/OutputConsole';
import RunButton from './components/RunButton';
import ThemeToggle from './components/ThemeToggle';
import EventButtons from './components/EventButtons';
import CodeSnippets from './components/CodeSnippets';
import ExecutionHistory from './components/ExecutionHistory';
import VariablesPanel from './components/VariablesPanel';

import './App.css';

/**
 * ==================================================
 * EVENTRA Runtime IDE
 * --------------------------------------------------
 * Features:
 * - Custom EVENTRA Language Editor
 * - Runtime Console
 * - Event Triggering
 * - Execution History
 * - Variable Tracking
 * - Theme Engine
 * - Import / Export
 * - Local Storage Persistence
 * ==================================================
 */

function App() {

  // ==========================================
  // INITIAL SAMPLE CODE
  // ==========================================

  const initialCode = `event start {
    say "Welcome to EVENTRA Runtime Engine"
    say "Initializing Event System..."
    trigger login
}

event login {
    say "Authentication Event Triggered"
}

event click {
    say "Button Click Event Executed"
}`;

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================

  const [code, setCode] =
      useState(initialCode);

  const [output, setOutput] =
      useState('');

  const [events, setEvents] =
      useState([]);

  const [variables, setVariables] =
      useState({});

  const [executionHistory,
      setExecutionHistory] =
      useState([]);

  const [isDarkMode,
      setIsDarkMode] =
      useState(true);

  const [currentTheme,
      setCurrentTheme] =
      useState('eventra-dark');

  // ==========================================
  // LOAD LOCAL STORAGE
  // ==========================================

  useEffect(() => {

    const savedCode =
        localStorage.getItem(
            'eventra_code'
        );

    const savedTheme =
        localStorage.getItem(
            'eventra_theme'
        );

    const savedHistory =
        localStorage.getItem(
            'eventra_history'
        );

    if (savedCode) {

      setCode(savedCode);
    }

    if (savedTheme) {

      setCurrentTheme(savedTheme);

      setIsDarkMode(
          savedTheme !==
          'eventra-light'
      );
    }

    if (savedHistory) {

      setExecutionHistory(
          JSON.parse(savedHistory)
      );
    }

  }, []);

  // ==========================================
  // SAVE CODE
  // ==========================================

  const saveCode =
      useCallback(() => {

    localStorage.setItem(
        'eventra_code',
        code
    );

    alert(
        '✅ EVENTRA program saved successfully'
    );

  }, [code]);

  // ==========================================
  // LOAD CODE
  // ==========================================

  const loadCode =
      useCallback(() => {

    const savedCode =
        localStorage.getItem(
            'eventra_code'
        );

    if (savedCode) {

      setCode(savedCode);

      alert(
          '✅ EVENTRA program loaded successfully'
      );

    } else {

      alert(
          '⚠️ No saved EVENTRA program found'
      );
    }

  }, []);

  // ==========================================
  // CLEAR SAVED CODE
  // ==========================================

  const clearSavedCode =
      useCallback(() => {

    localStorage.removeItem(
        'eventra_code'
    );

    alert(
        '🗑️ Saved EVENTRA program removed'
    );

  }, []);

  // ==========================================
  // EXPORT CODE
  // ==========================================

  const exportCode =
      useCallback(() => {

    const blob =
        new Blob(
            [code],
            {
              type: 'text/plain'
            }
        );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement('a');

    a.href = url;

    a.download = 'program.eventra';

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    alert(
        '✅ EVENTRA program exported'
    );

  }, [code]);

  // ==========================================
  // IMPORT CODE
  // ==========================================

  const importCode =
      useCallback((event) => {

    const file =
        event.target.files[0];

    if (file) {

      const reader =
          new FileReader();

      reader.onload = (e) => {

        setCode(e.target.result);

        alert(
            '✅ EVENTRA program imported'
        );
      };

      reader.readAsText(file);
    }

  }, []);

  // ==========================================
  // THEME TOGGLE
  // ==========================================

  const toggleTheme =
      useCallback(() => {

    const themes = [
      'eventra-dark',
      'monokai',
      'ocean',
      'forest',
      'eventra-light'
    ];

    const currentIndex =
        themes.indexOf(currentTheme);

    const nextIndex =
        (currentIndex + 1)
        % themes.length;

    const nextTheme =
        themes[nextIndex];

    setCurrentTheme(nextTheme);

    setIsDarkMode(
        nextTheme !==
        'eventra-light'
    );

    localStorage.setItem(
        'eventra_theme',
        nextTheme
    );

  }, [currentTheme]);

  // ==========================================
  // CODE CHANGE
  // ==========================================

  const handleCodeChange =
      (newCode) => {

    setCode(newCode);
  };

  // ==========================================
  // LOAD SNIPPETS
  // ==========================================

  const handleSnippetSelect =
      (snippetCode) => {

    setCode(snippetCode);
  };

  // ==========================================
  // OUTPUT APPEND
  // ==========================================

  const appendOutput =
      useCallback((text) => {

    setOutput(prev =>
        prev + text
    );

    // Extract runtime variables
    const inputRegex =
        /INPUT.*?(\w+)\s*=\s*(.*)/g;

    let match;

    const newVariables =
        { ...variables };

    while (
        (match = inputRegex.exec(text))
        !== null
    ) {

      const varName =
          match[1];

      const varValue =
          match[2];

      newVariables[varName] =
          varValue;
    }

    setVariables(newVariables);

  }, [variables]);

  // ==========================================
  // CLEAR OUTPUT
  // ==========================================

  const clearOutput =
      useCallback(() => {

    setOutput('');

    setVariables({});

  }, []);

  // ==========================================
  // SET EVENTS
  // ==========================================

  const setAvailableEvents =
      (eventList) => {

    setEvents(eventList);
  };

  // ==========================================
  // EXECUTION HISTORY
  // ==========================================

  const addToHistory =
      useCallback((codeSnippet,
                    success) => {

    const newEntry = {

      code:
          codeSnippet.substring(0, 60)
          +
          (
              codeSnippet.length > 60
                  ? '...'
                  : ''
          ),

      fullCode: codeSnippet,

      success,

      timestamp:
          new Date()
              .toLocaleTimeString()
    };

    setExecutionHistory(prev => {

      const updated = [
        newEntry,
        ...prev
      ].slice(0, 10);

      localStorage.setItem(
          'eventra_history',
          JSON.stringify(updated)
      );

      return updated;
    });

  }, []);

  // ==========================================
  // KEYBOARD SHORTCUTS
  // ==========================================

  useEffect(() => {

    const handleKeyDown =
        (e) => {

      // CTRL + S
      if (
          e.ctrlKey
          &&
          e.key === 's'
      ) {

        e.preventDefault();

        saveCode();
      }

      // CTRL + ENTER
      if (
          e.ctrlKey
          &&
          e.key === 'Enter'
      ) {

        e.preventDefault();

        document
            .querySelector(
                '.run-button'
            )
            ?.click();
      }

      // CTRL + L
      if (
          e.ctrlKey
          &&
          e.key === 'l'
      ) {

        e.preventDefault();

        loadCode();
      }
    };

    window.addEventListener(
        'keydown',
        handleKeyDown
    );

    return () => {

      window.removeEventListener(
          'keydown',
          handleKeyDown
      );
    };

  }, [saveCode, loadCode]);

  // ==========================================
  // UI
  // ==========================================

  return (

      <div
          className={`app ${
              isDarkMode
                  ? 'dark-mode'
                  : 'light-mode'
          }`}
      >

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <header className="app-header">

          <div>

            <h1>
              EVENTRA 
            </h1>

            <p className="subtitle">
              Event-Driven Runtime &
              Interpreter Engine
            </p>

          </div>

          <ThemeToggle
              isDarkMode={isDarkMode}
              onToggle={toggleTheme}
          />

        </header>

        {/* ================================= */}
        {/* STATUS BAR */}
        {/* ================================= */}

        <div className="runtime-status">

          <span>
            ● Runtime Status: ACTIVE
          </span>

          <span>
            ● AST Engine: READY
          </span>

          <span>
            ● Parser: READY
          </span>

          <span>
            ● Interpreter: ACTIVE
          </span>

        </div>

        {/* ================================= */}
        {/* MAIN CONTENT */}
        {/* ================================= */}

        <div className="main-content">

          {/* ============================= */}
          {/* LEFT PANEL */}
          {/* ============================= */}

          <div className="editor-section">

            <div className="section-header">

              <h2>
                EVENTRA Code Editor
              </h2>

              <CodeSnippets
                  onCodeSelect={
                      handleSnippetSelect
                  }

                  isDarkMode={
                      isDarkMode
                  }
              />

            </div>

            <EditorComponent
                code={code}

                onCodeChange={
                    handleCodeChange
                }

                isDarkMode={
                    isDarkMode
                }

                currentTheme={
                    currentTheme
                }
            />

            <RunButton
                code={code}

                onOutput={
                    appendOutput
                }

                onClear={
                    clearOutput
                }

                onEventsDetected={
                    setAvailableEvents
                }

                onSave={saveCode}

                onLoad={loadCode}

                addToHistory={
                    addToHistory
                }

                onExport={
                    exportCode
                }

                onImport={
                    importCode
                }

                isDarkMode={
                    isDarkMode
                }
            />

          </div>

          {/* ============================= */}
          {/* RIGHT PANEL */}
          {/* ============================= */}

          <div className="output-section">

            <div className="section-header">

              <h2>
                Runtime Console
              </h2>

            </div>

            <OutputConsole
                output={output}
                isDarkMode={isDarkMode}
            />

            <VariablesPanel
                variables={variables}
                isDarkMode={isDarkMode}
            />

            <div className="section-header">

              <h2>
                Event Triggers
              </h2>

            </div>

            <EventButtons
                events={events}

                code={code}

                onOutput={appendOutput}

                isDarkMode={isDarkMode}
            />

            <ExecutionHistory
                history={executionHistory}

                onSelectCode={setCode}

                isDarkMode={isDarkMode}
            />

          </div>

        </div>

        {/* ================================= */}
        {/* FOOTER */}
        {/* ================================= */}

        <footer className="app-footer">

          <p>
            EVENTRA Runtime Engine © 2026
          </p>

          <p>
            Built with React, Spring Boot,
            Lexer, Parser & AST Interpreter
          </p>

        </footer>

      </div>
  );
}

export default App;