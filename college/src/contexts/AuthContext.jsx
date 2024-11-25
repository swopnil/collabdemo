// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

// Mock user database
const mockUsers = [
  { username: 'admin', password: 'admin123', name: 'Admin User' },
  { username: 'user', password: 'user123', name: 'Regular User' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = (username, password) => {
    setError(null); // Reset any previous errors
    
    const foundUser = mockUsers.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      return true;
    } else {
      setError('Invalid username or password');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = (username, password, name) => {
    setError(null);
    
    // Check if username already exists
    if (mockUsers.find(u => u.username === username)) {
      setError('Username already exists');
      return false;
    }

    // In a real app, you'd make an API call here
    mockUsers.push({ username, password, name });
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};