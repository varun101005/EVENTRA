import React from 'react';

import ReactDOM from 'react-dom/client';

import './App.css';

import App from './App';

/**
 * ==========================================
 * EVENTRA Runtime Engine
 * ------------------------------------------
 * Frontend Bootstrap File
 *
 * Initializes:
 * - React Runtime
 * - EVENTRA IDE
 * - AST Visualization UI
 * - Runtime Console
 * ==========================================
 */

// ==========================================
// ROOT ELEMENT
// ==========================================

const rootElement =
    document.getElementById('root');

// ==========================================
// CREATE REACT ROOT
// ==========================================

const root =
    ReactDOM.createRoot(rootElement);

// ==========================================
// START APPLICATION
// ==========================================

console.log(
    '===================================='
);

console.log(
    ' Starting EVENTRA Frontend Runtime'
);

console.log(
    '===================================='
);

console.log(
    '[Frontend] React Runtime Initialized'
);

console.log(
    '[Frontend] EVENTRA IDE Loaded'
);

console.log(
    '[Frontend] Runtime Console Ready'
);

console.log(
    '[Frontend] AST Visualization Enabled'
);

console.log(
    '===================================='
);

// ==========================================
// RENDER APPLICATION
// ==========================================

root.render(

    <React.StrictMode>

        <App />

    </React.StrictMode>
);