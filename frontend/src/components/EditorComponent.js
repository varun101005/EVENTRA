import React from 'react';
import MonacoEditor from '@monaco-editor/react';

/**
 * EditorComponent - Code editor using Monaco Editor
 * Provides syntax highlighting and code editing capabilities
 */
const EditorComponent = ({ code, onCodeChange, isDarkMode }) => {
  
  // Monaco Editor configuration
  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    padding: { top: 10, bottom: 10 },
    wordWrap: 'on',
    renderWhitespace: 'selection',
  };
  
  // Monaco theme configuration
  const theme = isDarkMode ? 'vs-dark' : 'light';
  
  return (
    <div className="editor-container" style={{ 
      flex: 1, 
      minHeight: '400px',
      border: '2px solid var(--border-color)',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      <MonacoEditor
        height="100%"
        language="plaintext" // Using plaintext as EVENTRA is custom language
        theme={theme}
        value={code}
        onChange={(value) => onCodeChange(value || '')}
        options={editorOptions}
      />
    </div>
  );
};

export default EditorComponent;
