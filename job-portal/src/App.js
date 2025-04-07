import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import './styles/main.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;