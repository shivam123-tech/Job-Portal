// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async ({ username, password }) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email: username, password },
        { withCredentials: true }
      );

      setUser(res.data.user); // Or whatever you return from backend
      return { success: true };
    } catch (err) {
      console.error('Login error:', err.response?.data);
      return {
        success: false,
        message: err.response?.data?.error || 'Login failed',
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
