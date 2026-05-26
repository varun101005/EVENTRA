import React, {
  useState
} from 'react';

import axios from 'axios';

/**
 * ==================================================
 * EVENTRA Runtime Control Panel
 * --------------------------------------------------
 * Features:
 * - Execute EVENTRA programs
 * - Runtime API integration
 * - Event extraction
 * - Import / Export
 * - Save / Load system
 * - Error handling
 * ==================================================
 */

const RunButton = ({

  code,

  onOutput,

  onClear,

  onEventsDetected,

  isDarkMode,

  onSave,

  onLoad,

  addToHistory,

  onExport,

  onImport

}) => {

  // ==========================================
  // STATE
  // ==========================================

  const [isLoading,
      setIsLoading] =
      useState(false);

  const [error,
      setError] =
      useState(null);

  // ==========================================
  // API URL
  // ==========================================

  const API_BASE_URL =
      'http://localhost:8080/api';

  // ==========================================
  // RUN CODE
  // ==========================================

  const handleRun =
      async () => {

    // Validation
    if (
        !code
        ||
        code.trim() === ''
    ) {

      setError(
          'Please enter EVENTRA code'
      );

      setTimeout(
          () => setError(null),
          3000
      );

      return;
    }

    setIsLoading(true);

    setError(null);

    onClear();

    try {

      // Runtime Logs
      onOutput(
`====================================
 EVENTRA Runtime Engine Started
====================================

[Compiler] Starting execution...
`
      );

      // ====================================
      // STEP 1 - DETECT EVENTS
      // ====================================

      const eventsResponse =
          await axios.post(

              `${API_BASE_URL}/events`,

              {
                code
              }
          );

      if (
          eventsResponse.data.success
      ) {

        const events =
            eventsResponse.data.events
            || [];

        onEventsDetected(

            events.filter(
                e => e !== 'start'
            )
        );

        onOutput(
            `[Parser] Events Detected -> ${events.join(', ')}\n`
        );
      }

      // ====================================
      // STEP 2 - EXECUTE CODE
      // ====================================

      onOutput(
          '[Interpreter] Running AST...\n\n'
      );

      const runResponse =
          await axios.post(

              `${API_BASE_URL}/run`,

              {
                code
              }
          );

      // ====================================
      // SUCCESS
      // ====================================

      if (runResponse.data.success) {

        onOutput(
            runResponse.data.output
        );

        onOutput(
`\n====================================
 Execution Completed Successfully
====================================\n`
        );

        // History
        if (addToHistory) {

          addToHistory(
              code,
              true
          );
        }

      }

      // ====================================
      // FAILURE
      // ====================================

      else {

        setError(

            runResponse.data.error
            ||
            'Runtime execution failed'
        );

        if (addToHistory) {

          addToHistory(
              code,
              false
          );
        }
      }

    }

    // ======================================
    // ERROR HANDLING
    // ======================================

    catch (err) {

      console.error(
          'Runtime Error:',
          err
      );

      if (err.response) {

        setError(
            `Server Error: ${
                err.response.data.message
                ||
                err.message
            }`
        );

      }

      else if (err.request) {

        setError(
            'Cannot connect to EVENTRA backend server (Port 8080)'
        );

      }

      else {

        setError(
            `Error: ${err.message}`
        );
      }

      onOutput(
`\n[Runtime Error]
${err.message}\n`
      );
    }

    finally {

      setIsLoading(false);
    }
  };

  // ==========================================
  // BUTTON STYLE
  // ==========================================

  const buttonStyle = {

    padding: '0.8rem 1.4rem',

    fontSize: '0.95rem',

    fontWeight: '600',

    border: 'none',

    borderRadius: '12px',

    cursor: 'pointer',

    transition: 'all 0.25s ease',

    color: '#ffffff',

    boxShadow:
        '0 6px 18px rgba(0,0,0,0.25)'
  };

  // ==========================================
  // UI
  // ==========================================

  return (

      <div

          className="run-button-container"

          style={{

            display: 'flex',

            gap: '0.9rem',

            alignItems: 'center',

            flexWrap: 'wrap',

            padding: '1rem',

            background:
                isDarkMode
                    ? 'rgba(15,23,42,0.8)'
                    : '#ffffff',

            borderRadius: '14px',

            border:
                '1px solid var(--border-color)',

            boxShadow:
                '0 10px 25px rgba(0,0,0,0.25)',

            backdropFilter:
                'blur(12px)'
          }}
      >

        {/* ================================= */}
        {/* RUN */}
        {/* ================================= */}

        <button

            onClick={handleRun}

            disabled={isLoading}

            className="run-button"

            style={{

              ...buttonStyle,

              background:
                  isLoading

                      ? '#334155'

                      : 'linear-gradient(135deg,#22c55e,#16a34a)',

              opacity:
                  isLoading ? 0.7 : 1
            }}
        >

          {isLoading

              ? '⏳ Executing Runtime...'

              : '▶ Run EVENTRA'}

        </button>

        {/* SAVE */}

        <button

            onClick={onSave}

            style={{

              ...buttonStyle,

              background:
                  'linear-gradient(135deg,#3b82f6,#2563eb)'
            }}
        >

          💾 Save

        </button>

        {/* LOAD */}

        <button

            onClick={onLoad}

            style={{

              ...buttonStyle,

              background:
                  'linear-gradient(135deg,#6366f1,#4f46e5)'
            }}
        >

          📂 Load

        </button>

        {/* CLEAR */}

        <button

            onClick={onClear}

            style={{

              ...buttonStyle,

              background:
                  'linear-gradient(135deg,#f59e0b,#d97706)'
            }}
        >

          🗑 Clear

        </button>

        {/* EXPORT */}

        <button

            onClick={onExport}

            style={{

              ...buttonStyle,

              background:
                  'linear-gradient(135deg,#06b6d4,#0891b2)'
            }}
        >

          📤 Export

        </button>

        {/* IMPORT */}

        <input

            type="file"

            accept=".txt,.eventra,.evtra"

            id="import-file"

            style={{
              display: 'none'
            }}

            onChange={onImport}
        />

        <button

            onClick={() =>
                document
                    .getElementById(
                        'import-file'
                    )
                    .click()
            }

            style={{

              ...buttonStyle,

              background:
                  'linear-gradient(135deg,#8b5cf6,#7c3aed)'
            }}
        >

          📥 Import

        </button>

        {/* ================================= */}
        {/* ERROR */}
        {/* ================================= */}

        {error && (

            <div

                className="error-message"

                style={{

                  padding:
                      '0.8rem 1rem',

                  background:
                      'rgba(239,68,68,0.12)',

                  borderLeft:
                      '4px solid #ef4444',

                  borderRadius:
                      '10px',

                  color:
                      '#ef4444',

                  fontSize:
                      '0.9rem',

                  marginLeft:
                      'auto',

                  maxWidth:
                      '420px'
                }}
            >

              ⚠ {error}

            </div>
        )}

      </div>
  );
};

export default RunButton;