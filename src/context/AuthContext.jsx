import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('wets_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username, password) => {
    // Simple demo auth
    if (username && password) {
      const u = { username, name: 'Dr. Osama', role: 'Physician' };
      setUser(u);
      localStorage.setItem('wets_user', JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wets_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);