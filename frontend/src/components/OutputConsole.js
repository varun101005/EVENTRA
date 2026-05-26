import React, {
  useEffect,
  useRef
} from 'react';

/**
 * ==================================================
 * EVENTRA Runtime Console
 * --------------------------------------------------
 * Features:
 * - Auto-scrolling terminal
 * - Runtime logging
 * - AST execution output
 * - Error visualization
 * - Terminal UI styling
 * ==================================================
 */

const OutputConsole = ({
  output,
  isDarkMode
}) => {

  // ==========================================
  // CONSOLE REF
  // ==========================================

  const consoleRef =
      useRef(null);

  // ==========================================
  // AUTO SCROLL
  // ==========================================

  useEffect(() => {

    if (consoleRef.current) {

      consoleRef.current.scrollTop =
          consoleRef.current.scrollHeight;
    }

  }, [output]);

  // ==========================================
  // DEFAULT PLACEHOLDER
  // ==========================================

  const placeholderText =

`EVENTRA Runtime Console Initialized...

Waiting for program execution...

Compiler Pipeline:
✓ Lexical Analysis
✓ Syntax Parsing
✓ AST Generation
✓ Runtime Interpretation
`;

  // ==========================================
  // UI
  // ==========================================

  return (

      <div

          ref={consoleRef}

          className="output-console"

          style={{

            flex: 1,

            minHeight: '260px',

            maxHeight: '420px',

            background:
                isDarkMode
                    ? '#020617'
                    : '#f8fafc',

            border:
                '1px solid var(--border-color)',

            borderRadius:
                '14px',

            padding:
                '1rem',

            fontFamily:
                "'Fira Code', monospace",

            fontSize:
                '14px',

            overflowY:
                'auto',

            whiteSpace:
                'pre-wrap',

            wordBreak:
                'break-word',

            color:
                isDarkMode
                    ? '#22c55e'
                    : '#0f172a',

            lineHeight:
                '1.6',

            boxShadow:
                isDarkMode

                    ? 'inset 0 0 18px rgba(34,197,94,0.08)'

                    : 'inset 0 0 10px rgba(0,0,0,0.05)',

            position:
                'relative'
          }}
      >

        {/* ================================= */}
        {/* TERMINAL HEADER */}
        {/* ================================= */}

        <div

            style={{

              display: 'flex',

              alignItems: 'center',

              gap: '0.5rem',

              marginBottom: '1rem',

              paddingBottom: '0.7rem',

              borderBottom:
                  isDarkMode
                      ? '1px solid #1e293b'
                      : '1px solid #e2e8f0'
            }}
        >

          {/* TERMINAL DOTS */}

          <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#ef4444'
              }}
          />

          <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#f59e0b'
              }}
          />

          <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#22c55e'
              }}
          />

          <span

              style={{

                marginLeft: '0.8rem',

                fontSize: '0.85rem',

                color:
                    'var(--text-secondary)'
              }}
          >

            EVENTRA Runtime Console

          </span>

        </div>

        {/* ================================= */}
        {/* OUTPUT */}
        {/* ================================= */}

        <div>

          {output
              ? output
              : placeholderText}

        </div>

        {/* ================================= */}
        {/* TERMINAL CURSOR */}
        {/* ================================= */}

        <span

            style={{

              display: 'inline-block',

              width: '10px',

              marginLeft: '2px',

              background:
                  isDarkMode
                      ? '#22c55e'
                      : '#0f172a',

              animation:
                  'blink 1s infinite'
            }}
        >

          &nbsp;

        </span>

        {/* ================================= */}
        {/* BLINK ANIMATION */}
        {/* ================================= */}

        <style>

{`
@keyframes blink {

  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
`}

        </style>

      </div>
  );
};

export default OutputConsole;