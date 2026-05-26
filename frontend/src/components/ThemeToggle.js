import React from 'react';

/**
 * ==================================================
 * EVENTRA Theme Engine Toggle
 * --------------------------------------------------
 * Features:
 * - Dark / Light runtime switching
 * - Animated UI
 * - Runtime appearance control
 * ==================================================
 */

const ThemeToggle = ({
  isDarkMode,
  onToggle
}) => {

  return (

      <button

          onClick={onToggle}

          style={{

            padding:
                '0.75rem 1.3rem',

            fontSize:
                '0.95rem',

            fontWeight:
                '600',

            background:
                isDarkMode

                    ? 'linear-gradient(135deg,#facc15,#eab308)'

                    : 'linear-gradient(135deg,#1e293b,#0f172a)',

            color:
                isDarkMode
                    ? '#0f172a'
                    : '#ffffff',

            border:
                'none',

            borderRadius:
                '14px',

            cursor:
                'pointer',

            transition:
                'all 0.25s ease',

            display:
                'flex',

            alignItems:
                'center',

            gap:
                '0.7rem',

            minWidth:
                '165px',

            justifyContent:
                'center',

            boxShadow:
                isDarkMode

                    ? '0 6px 18px rgba(250,204,21,0.35)'

                    : '0 6px 18px rgba(15,23,42,0.35)'
          }}

          onMouseEnter={(e) => {

            e.target.style.transform =
                'translateY(-2px)';
          }}

          onMouseLeave={(e) => {

            e.target.style.transform =
                'translateY(0)';
          }}
      >

        {isDarkMode ? (

            <>
              <span
                  style={{
                    fontSize: '1.2rem'
                  }}
              >
                ☀️
              </span>

              <span>
                Light Mode
              </span>
            </>

        ) : (

            <>
              <span
                  style={{
                    fontSize: '1.2rem'
                  }}
              >
                🌙
              </span>

              <span>
                Dark Mode
              </span>
            </>
        )}

      </button>
  );
};

export default ThemeToggle;