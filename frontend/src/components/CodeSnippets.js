import React, { useState } from 'react';

/**
 * ==================================================
 * EVENTRA Code Snippets Library
 * --------------------------------------------------
 * Prebuilt runtime examples for EVENTRA IDE
 * ==================================================
 */

const CodeSnippets = ({
  onCodeSelect,
  isDarkMode
}) => {

  const [isOpen, setIsOpen] =
      useState(false);

  // ==========================================
  // EVENTRA SNIPPETS
  // ==========================================

  const snippets = [

    // ======================================
    // HELLO WORLD
    // ======================================

    {
      name: '📝 Runtime Hello World',

      code:
`event start {
    say "Welcome to EVENTRA Runtime Engine"
    say "Runtime initialized successfully"
}`
    },

    // ======================================
    // EVENT HANDLER
    // ======================================

    {
      name: '🎯 Event Handler System',

      code:
`event start {
    say "Program Started"
    trigger click
}

event click {
    say "Button Click Event Executed"
}

event login {
    say "User Authentication Event Triggered"
}`
    },

    // ======================================
    // INPUT OUTPUT
    // ======================================

    {
      name: '📥 Input Output Runtime',

      code:
`event start {

    say "Enter your username"

    input username

    say "Welcome, " + username

    say "EVENTRA Runtime Active"
}`
    },

    // ======================================
    // CHATBOT
    // ======================================

    {
      name: '🤖 EVENTRA Chat Bot',

      code:
`event start {

    say "EVENTRA Bot Online"

    say "What is your name?"

    input user

    say "Hello, " + user
}

event help {

    say "Available commands:"
    say "help"
    say "joke"
}

event joke {

    say "Why do programmers hate bugs?"
    say "Because bugs debug them back!"
}`
    },

    // ======================================
    // GAME SYSTEM
    // ======================================

    {
      name: '🎮 Mini Game Runtime',

      code:
`event start {

    say "GAME ENGINE STARTED"

    trigger inventory
}

event inventory {

    say "Opening inventory..."
    say "Sword"
    say "Shield"
    say "Potion"
}

event attack {

    say "Enemy attacked"
    say "Damage dealt: 50"
}

event defend {

    say "Shield activated"
}`
    },

    // ======================================
    // QUIZ SYSTEM
    // ======================================

    {
      name: '📊 Quiz Runtime',

      code:
`event start {

    say "EVENTRA QUIZ SYSTEM"

    say "Question:"
    say "Capital of France?"

    input answer

    say "Your Answer:"
    say answer
}`
    },

    // ======================================
    // WEATHER MOCKUP
    // ======================================

    {
      name: '🌦️ Weather Runtime',

      code:
`event start {

    say "EVENTRA Weather Engine"

    say "Enter city"

    input city

    say "Loading weather for"

    say city

    say "Temperature: 25C"

    say "Condition: Sunny"
}`
    }
  ];

  // ==========================================
  // HANDLE SELECTION
  // ==========================================

  const handleSelect =
      (snippet) => {

    onCodeSelect(snippet.code);

    setIsOpen(false);
  };

  // ==========================================
  // UI
  // ==========================================

  return (

      <div
          style={{
            position: 'relative',
            display: 'inline-block'
          }}
      >

        {/* ================================= */}
        {/* DROPDOWN BUTTON */}
        {/* ================================= */}

        <button

            onClick={() =>
                setIsOpen(!isOpen)
            }

            style={{

              padding:
                  '0.8rem 1.4rem',

              fontSize:
                  '0.95rem',

              fontWeight:
                  '600',

              background:
                  isDarkMode
                      ? '#1e293b'
                      : '#e2e8f0',

              color:
                  isDarkMode
                      ? '#ffffff'
                      : '#0f172a',

              border:
                  isDarkMode
                      ? '1px solid #334155'
                      : '1px solid #cbd5e1',

              borderRadius:
                  '10px',

              cursor:
                  'pointer',

              transition:
                  'all 0.25s ease',

              boxShadow:
                  isDarkMode
                      ? '0 0 12px rgba(56,189,248,0.2)'
                      : '0 4px 10px rgba(0,0,0,0.08)'
            }}
        >

          📚 EVENTRA Snippets
          {' '}
          {isOpen ? '▲' : '▼'}

        </button>

        {/* ================================= */}
        {/* DROPDOWN MENU */}
        {/* ================================= */}

        {isOpen && (

            <div

                style={{

                  position:
                      'absolute',

                  top: '100%',

                  left: 0,

                  marginTop:
                      '0.6rem',

                  background:
                      isDarkMode
                          ? '#111827'
                          : '#ffffff',

                  border:
                      isDarkMode
                          ? '1px solid #334155'
                          : '1px solid #cbd5e1',

                  borderRadius:
                      '14px',

                  boxShadow:
                      '0 10px 25px rgba(0,0,0,0.35)',

                  zIndex: 1000,

                  minWidth:
                      '300px',

                  maxHeight:
                      '420px',

                  overflowY:
                      'auto',

                  backdropFilter:
                      'blur(12px)'
                }}
            >

              {snippets.map(
                  (snippet, index) => (

                  <button

                      key={index}

                      onClick={() =>
                          handleSelect(snippet)
                      }

                      style={{

                        display:
                            'block',

                        width:
                            '100%',

                        padding:
                            '1rem',

                        textAlign:
                            'left',

                        background:
                            'transparent',

                        border:
                            'none',

                        borderBottom:
                            isDarkMode
                                ? '1px solid #1e293b'
                                : '1px solid #f1f5f9',

                        color:
                            isDarkMode
                                ? '#f8fafc'
                                : '#0f172a',

                        cursor:
                            'pointer',

                        transition:
                            'all 0.2s ease',

                        fontSize:
                            '0.92rem'
                      }}

                      onMouseEnter={(e) => {

                        e.target.style.background =
                            isDarkMode
                                ? '#1e293b'
                                : '#f8fafc';
                      }}

                      onMouseLeave={(e) => {

                        e.target.style.background =
                            'transparent';
                      }}
                  >

                    {snippet.name}

                  </button>
              ))}

            </div>
        )}

        {/* ================================= */}
        {/* OUTSIDE CLICK CLOSE */}
        {/* ================================= */}

        {isOpen && (

            <div

                style={{

                  position: 'fixed',

                  top: 0,

                  left: 0,

                  right: 0,

                  bottom: 0,

                  zIndex: 999
                }}

                onClick={() =>
                    setIsOpen(false)
                }
            />
        )}

      </div>
  );
};

export default CodeSnippets;