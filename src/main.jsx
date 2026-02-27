import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error:', message, 'at', source, ':', lineno, ':', colno);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);