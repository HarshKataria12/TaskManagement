import React from 'react';
import { createRoot } from 'react-dom/client'; // No need for ReactDOM import
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css'; // CSS import remains at the bottom of app-specific imports

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);