import React, { useEffect } from 'react';

import MonacoEditor from '@monaco-editor/react';

/**
 * ==================================================
 * EVENTRA Monaco Editor Component
 * --------------------------------------------------
 * Features:
 * - Custom EVENTRA Syntax Highlighting
 * - Auto-completion
 * - Multi-theme support
 * - Runtime IDE experience
 * - Monaco-based code editor
 * ==================================================
 */

const EditorComponent = ({
  code,
  onCodeChange,
  isDarkMode,
  currentTheme
}) => {

  // ==========================================
  // MONACO INITIALIZATION
  // ==========================================

  useEffect(() => {

    if (!window.monaco) return;

    // ======================================
    // REGISTER LANGUAGE
    // ======================================

    window.monaco.languages.register({
      id: 'eventra'
    });

    // ======================================
    // TOKENIZER
    // ======================================

    window.monaco.languages
        .setMonarchTokensProvider(
            'eventra',
            {

      tokenizer: {

        root: [

          // Keywords
          [
            /\b(event|trigger|say|input)\b/,

            'keyword'
          ],

          // Strings
          [
            /"[^"]*"/,

            'string'
          ],

          // Comments
          [
            /#.*$/,

            'comment'
          ],

          // Numbers
          [
            /\d+/,

            'number'
          ],

          // Brackets
          [
            /[{}]/,

            'delimiter.bracket'
          ],

          // Operators
          [
            /[+]/,

            'operator'
          ],

          // Identifiers
          [
            /[a-zA-Z_][a-zA-Z0-9_]*/,

            'identifier'
          ]
        ]
      }
    });

    // ======================================
    // EVENTRA DARK THEME
    // ======================================

    window.monaco.editor.defineTheme(
        'eventra-dark',
        {

      base: 'vs-dark',

      inherit: true,

      rules: [

        {
          token: 'keyword',
          foreground: '38BDF8',
          fontStyle: 'bold'
        },

        {
          token: 'string',
          foreground: 'FACC15'
        },

        {
          token: 'comment',
          foreground: '64748B',
          fontStyle: 'italic'
        },

        {
          token: 'number',
          foreground: '22C55E'
        },

        {
          token: 'identifier',
          foreground: 'E2E8F0'
        },

        {
          token: 'operator',
          foreground: 'FB7185'
        }
      ],

      colors: {

        'editor.background': '#020617',

        'editor.foreground': '#F8FAFC',

        'editorCursor.foreground': '#38BDF8',

        'editor.lineHighlightBackground':
            '#1E293B'
      }
    });

    // ======================================
    // EVENTRA LIGHT THEME
    // ======================================

    window.monaco.editor.defineTheme(
        'eventra-light',
        {

      base: 'vs',

      inherit: true,

      rules: [

        {
          token: 'keyword',
          foreground: '2563EB',
          fontStyle: 'bold'
        },

        {
          token: 'string',
          foreground: 'CA8A04'
        },

        {
          token: 'comment',
          foreground: '64748B',
          fontStyle: 'italic'
        },

        {
          token: 'number',
          foreground: '16A34A'
        },

        {
          token: 'identifier',
          foreground: '0F172A'
        },

        {
          token: 'operator',
          foreground: 'DC2626'
        }
      ],

      colors: {

        'editor.background': '#FFFFFF',

        'editor.foreground': '#0F172A'
      }
    });

    // ======================================
    // AUTO COMPLETION
    // ======================================

    window.monaco.languages
        .registerCompletionItemProvider(
            'eventra',
            {

      provideCompletionItems:
          (model, position) => {

        const word =
            model.getWordUntilPosition(
                position
            );

        const range = {

          startLineNumber:
              position.lineNumber,

          endLineNumber:
              position.lineNumber,

          startColumn:
              word.startColumn,

          endColumn:
              word.endColumn
        };

        return {

          suggestions: [

            // EVENT BLOCK
            {
              label: 'event',

              kind:
                  window.monaco.languages
                      .CompletionItemKind
                      .Keyword,

              insertText:
`event \${1:eventName} {
    $0
}`,

              insertTextRules:
                  window.monaco.languages
                      .CompletionItemInsertTextRule
                      .InsertAsSnippet,

              documentation:
                  'Define EVENTRA event block',

              range
            },

            // SAY
            {
              label: 'say',

              kind:
                  window.monaco.languages
                      .CompletionItemKind
                      .Keyword,

              insertText:
                  'say "$0"',

              insertTextRules:
                  window.monaco.languages
                      .CompletionItemInsertTextRule
                      .InsertAsSnippet,

              documentation:
                  'Print output to runtime console',

              range
            },

            // INPUT
            {
              label: 'input',

              kind:
                  window.monaco.languages
                      .CompletionItemKind
                      .Keyword,

              insertText:
                  'input ${1:variable}',

              insertTextRules:
                  window.monaco.languages
                      .CompletionItemInsertTextRule
                      .InsertAsSnippet,

              documentation:
                  'Receive user input',

              range
            },

            // TRIGGER
            {
              label: 'trigger',

              kind:
                  window.monaco.languages
                      .CompletionItemKind
                      .Keyword,

              insertText:
                  'trigger ${1:eventName}',

              insertTextRules:
                  window.monaco.languages
                      .CompletionItemInsertTextRule
                      .InsertAsSnippet,

              documentation:
                  'Trigger another event',

              range
            }
          ]
        };
      }
    });

  }, []);

  // ==========================================
  // EDITOR OPTIONS
  // ==========================================

  const editorOptions = {

    minimap: {
      enabled: false
    },

    fontSize: 15,

    lineNumbers: 'on',

    scrollBeyondLastLine: false,

    automaticLayout: true,

    padding: {

      top: 14,

      bottom: 14
    },

    wordWrap: 'on',

    quickSuggestions: true,

    suggestOnTriggerCharacters: true,

    acceptSuggestionOnEnter: 'smart',

    smoothScrolling: true,

    cursorBlinking: 'smooth',

    renderLineHighlight: 'all'
  };

  // ==========================================
  // ACTIVE THEME
  // ==========================================

  const theme =
      isDarkMode
          ? currentTheme
          : 'eventra-light';

  // ==========================================
  // UI
  // ==========================================

  return (

      <div

          className="editor-container"

          style={{

            flex: 1,

            minHeight: '500px',

            border:
                '1px solid var(--border-color)',

            borderRadius: '14px',

            overflow: 'hidden',

            boxShadow:
                '0 10px 30px rgba(0,0,0,0.25)'
          }}
      >

        <MonacoEditor

            height="100%"

            language="eventra"

            theme={theme}

            value={code}

            onChange={(value) =>
                onCodeChange(value || '')
            }

            options={editorOptions}
        />

      </div>
  );
};

export default EditorComponent;