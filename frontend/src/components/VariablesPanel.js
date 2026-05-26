import React from 'react';

/**
 * ==================================================
 * EVENTRA Runtime Variables Panel
 * --------------------------------------------------
 * Features:
 * - Variable memory visualization
 * - Runtime state inspection
 * - Input tracking
 * ==================================================
 */

const VariablesPanel = ({
  variables,
  isDarkMode
}) => {

  // ==========================================
  // VARIABLES
  // ==========================================

  const variableNames =
      Object.keys(variables);

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (variableNames.length === 0) {

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
                  'blur(10px)'
            }}
        >

          <h3

              style={{

                marginBottom:
                    '0.8rem',

                color:
                    'var(--text-primary)',

                fontSize:
                    '1.1rem'
              }}
          >

            🔍 Runtime Variables

          </h3>

          <div
              style={{
                textAlign: 'center',
                padding: '1.5rem'
              }}
          >

            <p

                style={{

                  color:
                      'var(--text-secondary)',

                  fontStyle:
                      'italic',

                  lineHeight:
                      '1.6'
                }}
            >

              No runtime variables detected.

              <br /><br />

              Use:
              <strong>
                {' '}input variableName
              </strong>

              <br />

              to create variables.

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
                'blur(10px)'
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

            🔍 EVENTRA Variables

          </h3>

          <p
              style={{
                fontSize: '0.84rem',
                color: 'var(--text-secondary)'
              }}
          >

            Runtime memory inspection panel

          </p>

        </div>

        {/* ================================= */}
        {/* VARIABLES */}
        {/* ================================= */}

        <div

            style={{

              display: 'grid',

              gap: '0.75rem'
            }}
        >

          {variableNames.map(
              (varName) => (

              <div

                  key={varName}

                  style={{

                    padding:
                        '0.9rem 1rem',

                    background:
                        isDarkMode
                            ? 'rgba(30,41,59,0.8)'
                            : '#f8fafc',

                    borderRadius:
                        '12px',

                    border:
                        '1px solid var(--border-color)',

                    display:
                        'flex',

                    justifyContent:
                        'space-between',

                    alignItems:
                        'center',

                    transition:
                        'all 0.2s ease'
                  }}
              >

                {/* VARIABLE NAME */}

                <div>

                  <div

                      style={{

                        fontWeight:
                            '600',

                        color:
                            isDarkMode
                                ? '#7dd3fc'
                                : '#2563eb',

                        fontSize:
                            '0.95rem'
                      }}
                  >

                    {varName}

                  </div>

                  <div

                      style={{

                        marginTop:
                            '0.2rem',

                        fontSize:
                            '0.75rem',

                        color:
                            'var(--text-secondary)'
                      }}
                  >

                    Runtime Variable

                  </div>

                </div>

                {/* VALUE */}

                <div

                    style={{

                      fontFamily:
                          "'Fira Code', monospace",

                      color:
                          isDarkMode
                              ? '#facc15'
                              : '#b45309',

                      fontSize:
                          '0.9rem',

                      background:
                          isDarkMode
                              ? '#020617'
                              : '#ffffff',

                      padding:
                          '0.45rem 0.8rem',

                      borderRadius:
                          '8px',

                      border:
                          '1px solid var(--border-color)',

                      maxWidth:
                          '220px',

                      overflow:
                          'hidden',

                      textOverflow:
                          'ellipsis'
                    }}
                >

                  "{variables[varName] || ''}"

                </div>

              </div>
          ))}

        </div>

        {/* ================================= */}
        {/* FOOTER */}
        {/* ================================= */}

        <div

            style={{

              marginTop: '1rem',

              padding: '0.8rem',

              borderRadius: '10px',

              background:
                  isDarkMode
                      ? 'rgba(30,41,59,0.7)'
                      : '#f8fafc',

              border:
                  '1px solid var(--border-color)',

              fontSize: '0.84rem',

              color:
                  'var(--text-secondary)'
            }}
        >

          💡 Variables are stored in
          EVENTRA runtime memory during
          interpretation.

        </div>

      </div>
  );
};

export default VariablesPanel;