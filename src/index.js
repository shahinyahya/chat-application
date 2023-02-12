import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { ChatContextProvider } from './context/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <React.StrictMode>
      <ChatContextProvider>
        <Router>
          <App />
        </Router>
      </ChatContextProvider>
    </React.StrictMode>
  </AuthContextProvider >
);

reportWebVitals();
