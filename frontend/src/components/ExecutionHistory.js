import React from 'react';

/**
 * ==================================================
 * EVENTRA Execution History Panel
 * --------------------------------------------------
 * Features:
 * - Runtime history tracking
 * - Previous execution reload
 * - Success / error indicators
 * - Timestamp logging
 * ==================================================
 */

const ExecutionHistory = ({
  history,
  onSelectCode,
  isDarkMode
}) => {

  // ==========================================
  // EMPTY HISTORY
  // ==========================================

  if (!history || history.length === 0) {

    return (

        <div

            style={{

              padding: '1.2rem',

              background:
                  isDarkMode
                      ? 'rgba(15,23,42,0.8)'
                      : '#ffffff',

              borderRadius: '14px',

              border:
                  '1px solid var(--border-color)',

              marginTop: '1rem',

              boxShadow:
                  '0 8px 20px rgba(0,0,0,0.25)',

              backdropFilter:
                  'blur(10px)'
            }}
        >

          <div
              style={{
                textAlign: 'center',
                padding: '1.5rem'
              }}
          >

            <h3
                style={{
                  marginBottom: '0.7rem',
                  color: 'var(--text-primary)'
                }}
            >

              📜 Runtime History Empty

            </h3>

            <p
                style={{
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic',
                  lineHeight: '1.5'
                }}
            >

              Execute EVENTRA programs
              to generate runtime history.

            </p>

          </div>

        </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (

      <div

          style={{

            padding: '1rem',

            background:
                isDarkMode
                    ? 'rgba(15,23,42,0.8)'
                    : '#ffffff',

            borderRadius: '14px',

            border:
                '1px solid var(--border-color)',

            marginTop: '1rem',

            boxShadow:
                '0 10px 25px rgba(0,0,0,0.25)',

            backdropFilter:
                'blur(12px)'
          }}
      >

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div
            style={{
              marginBottom: '1rem'
            }}
        >

          <h3

              style={{

                color:
                    'var(--text-primary)',

                fontSize:
                    '1.1rem',

                marginBottom:
                    '0.35rem'
              }}
          >

            📜 EVENTRA Runtime History

          </h3>

          <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)'
              }}
          >

            Previously executed programs

          </p>

        </div>

        {/* ================================= */}
        {/* HISTORY LIST */}
        {/* ================================= */}

        <div

            style={{

              display: 'flex',

              flexDirection: 'column',

              gap: '0.8rem'
            }}
        >

          {history.map(
              (entry, index) => (

              <button

                  key={index}

                  onClick={() =>
                      onSelectCode(
                          entry.fullCode
                      )
                  }

                  style={{

                    padding:
                        '1rem',

                    background:
                        entry.success

                            ? (
                                isDarkMode
                                    ? 'rgba(34,197,94,0.08)'
                                    : 'rgba(22,163,74,0.08)'
                            )

                            : (
                                isDarkMode
                                    ? 'rgba(239,68,68,0.08)'
                                    : 'rgba(220,38,38,0.08)'
                            ),

                    border:
                        entry.success

                            ? '1px solid rgba(34,197,94,0.35)'

                            : '1px solid rgba(239,68,68,0.35)',

                    borderRadius:
                        '12px',

                    cursor:
                        'pointer',

                    transition:
                        'all 0.25s ease',

                    textAlign:
                        'left',

                    backdropFilter:
                        'blur(10px)'
                  }}

                  onMouseEnter={(e) => {

                    e.target.style.transform =
                        'translateX(4px)';

                    e.target.style.boxShadow =
                        '0 6px 18px rgba(0,0,0,0.2)';
                  }}

                  onMouseLeave={(e) => {

                    e.target.style.transform =
                        'translateX(0)';
                  }}
              >

                {/* ======================= */}
                {/* TOP ROW */}
                {/* ======================= */}

                <div

                    style={{

                      display: 'flex',

                      justifyContent:
                          'space-between',

                      alignItems:
                          'center',

                      marginBottom:
                          '0.5rem'
                    }}
                >

                  <span

                      style={{

                        fontWeight:
                            '600',

                        color:
                            'var(--text-primary)',

                        fontSize:
                            '0.92rem'
                      }}
                  >

                    {entry.success

                        ? '✅ SUCCESS'

                        : '❌ FAILED'}

                  </span>

                  <span

                      style={{

                        fontSize:
                            '0.75rem',

                        color:
                            'var(--text-secondary)'
                      }}
                  >

                    {entry.timestamp}

                  </span>

                </div>

                {/* ======================= */}
                {/* CODE PREVIEW */}
                {/* ======================= */}

                <pre

                    style={{

                      whiteSpace:
                          'pre-wrap',

                      overflow:
                          'hidden',

                      textOverflow:
                          'ellipsis',

                      color:
                          'var(--text-secondary)',

                      fontSize:
                          '0.82rem',

                      lineHeight:
                          '1.45'
                    }}
                >

{entry.code}

                </pre>

              </button>
          ))}

        </div>

        {/* ================================= */}
        {/* INFO PANEL */}
        {/* ================================= */}

        <div

            style={{

              marginTop: '1rem',

              padding: '0.9rem',

              borderRadius: '10px',

              background:
                  isDarkMode
                      ? 'rgba(30,41,59,0.7)'
                      : '#f8fafc',

              border:
                  '1px solid var(--border-color)',

              fontSize: '0.84rem',

              color:
                  'var(--text-secondary)',

              lineHeight: '1.5'
            }}
        >

          <strong>
            💡 Runtime Tip
          </strong>

          <p
              style={{
                marginTop: '0.4rem'
              }}
          >

            Click any execution entry
            to reload that EVENTRA
            program into the editor.

          </p>

        </div>

      </div>
  );
};

export default ExecutionHistory;