import React, { useState } from 'react';

import axios from 'axios';

/**
 * ==================================================
 * EVENTRA Event Runtime Panel
 * --------------------------------------------------
 * Features:
 * - Dynamic Event Detection
 * - Runtime Event Triggering
 * - Backend API Integration
 * - Async Event Execution
 * ==================================================
 */

const EventButtons = ({
  events,
  code,
  onOutput,
  isDarkMode
}) => {

  // ==========================================
  // LOADING STATE
  // ==========================================

  const [isLoading,
      setIsLoading] =
      useState(null);

  // ==========================================
  // API URL
  // ==========================================

  const API_BASE_URL =
      'http://localhost:8080/api';

  // ==========================================
  // TRIGGER EVENT
  // ==========================================

  const handleTriggerEvent =
      async (eventName) => {

    // Validation
    if (
        !code
        ||
        code.trim() === ''
    ) {

      alert(
          'Please enter EVENTRA code first'
      );

      return;
    }

    setIsLoading(eventName);

    try {

      // Runtime log
      onOutput(
          `\n[Runtime] Triggering event -> ${eventName}\n`
      );

      // API Request
      const response =
          await axios.post(

              `${API_BASE_URL}/trigger`,

              {

                eventName,

                code
              }
          );

      // Success
      if (response.data.success) {

        onOutput(
            `\n${response.data.output}\n`
        );

      } else {

        onOutput(
            `\n[Runtime Error] ${
                response.data.error
                ||
                'Failed to trigger event'
            }\n`
        );
      }

    }

    catch (err) {

      console.error(
          'Event Runtime Error:',
          err
      );

      onOutput(
          `\n[API Error] ${
              err.message
          }\n`
      );
    }

    finally {

      setIsLoading(null);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (

      <div

          className="event-buttons-container"

          style={{

            flex: 1,

            padding: '1rem',

            background:
                isDarkMode
                    ? 'rgba(15,23,42,0.8)'
                    : '#ffffff',

            borderRadius: '14px',

            border:
                '1px solid var(--border-color)',

            minHeight: '180px',

            boxShadow:
                '0 10px 25px rgba(0,0,0,0.25)',

            backdropFilter:
                'blur(12px)'
          }}
      >

        {/* ================================= */}
        {/* EMPTY STATE */}
        {/* ================================= */}

        {events.length === 0 ? (

            <div

                style={{

                  color:
                      'var(--text-secondary)',

                  textAlign:
                      'center',

                  padding: '2rem'
                }}
            >

              <h3
                  style={{
                    marginBottom: '0.8rem'
                  }}
              >

                ⚠ No Events Detected

              </h3>

              <p
                  style={{
                    fontSize: '0.9rem'
                  }}
              >

                Define EVENTRA event blocks:

              </p>

              <pre
                  style={{

                    marginTop: '1rem',

                    padding: '1rem',

                    borderRadius: '10px',

                    background:
                        isDarkMode
                            ? '#020617'
                            : '#f8fafc',

                    textAlign: 'left',

                    overflowX: 'auto'
                  }}
              >

{`event start {
    say "Hello EVENTRA"
}`}

              </pre>

            </div>

        ) : (

            <>
              {/* ========================= */}
              {/* EVENT BUTTONS */}
              {/* ========================= */}

              <div

                  style={{

                    display: 'flex',

                    flexWrap: 'wrap',

                    gap: '0.9rem'
                  }}
              >

                {events.map(
                    (eventName) => (

                    <button

                        key={eventName}

                        onClick={() =>
                            handleTriggerEvent(
                                eventName
                            )
                        }

                        disabled={
                            isLoading
                            ===
                            eventName
                        }

                        style={{

                          padding:
                              '0.85rem 1.5rem',

                          fontSize:
                              '0.95rem',

                          fontWeight:
                              '600',

                          background:
                              isLoading === eventName
                                  ? '#334155'
                                  : 'linear-gradient(135deg,#38bdf8,#0ea5e9)',

                          color:
                              '#ffffff',

                          border:
                              'none',

                          borderRadius:
                              '12px',

                          cursor:
                              isLoading === eventName
                                  ? 'not-allowed'
                                  : 'pointer',

                          transition:
                              'all 0.25s ease',

                          opacity:
                              isLoading === eventName
                                  ? 0.7
                                  : 1,

                          transform:
                              isLoading === eventName
                                  ? 'scale(0.98)'
                                  : 'scale(1)',

                          boxShadow:
                              '0 6px 18px rgba(56,189,248,0.35)'
                        }}

                        onMouseEnter={(e) => {

                          if (
                              isLoading
                              !==
                              eventName
                          ) {

                            e.target.style.transform =
                                'translateY(-2px)';
                          }
                        }}

                        onMouseLeave={(e) => {

                          e.target.style.transform =
                              'scale(1)';
                        }}
                    >

                      {isLoading === eventName

                          ? '⏳ Executing...'

                          : `⚡ ${eventName}`}

                    </button>
                ))}

              </div>

              {/* ========================= */}
              {/* INFO PANEL */}
              {/* ========================= */}

              <div

                  style={{

                    marginTop: '1.2rem',

                    padding: '1rem',

                    borderRadius: '12px',

                    background:
                        isDarkMode
                            ? 'rgba(30,41,59,0.8)'
                            : '#f8fafc',

                    color:
                        'var(--text-secondary)',

                    fontSize: '0.88rem',

                    border:
                        '1px solid var(--border-color)'
                  }}
              >

                <strong>
                  💡 EVENTRA Runtime Info
                </strong>

                <p
                    style={{
                      marginTop: '0.5rem',
                      lineHeight: '1.5'
                    }}
                >

                  • Events are automatically
                  extracted from AST parsing.

                  <br />

                  • The <strong>start</strong>
                  event executes automatically.

                  <br />

                  • Events can trigger other
                  events using:

                </p>

                <pre
                    style={{

                      marginTop: '0.8rem',

                      padding: '0.8rem',

                      borderRadius: '8px',

                      background:
                          isDarkMode
                              ? '#020617'
                              : '#ffffff',

                      overflowX: 'auto'
                    }}
                >

{`trigger login`}

                </pre>

              </div>
            </>
        )}

      </div>
  );
};

export default EventButtons;