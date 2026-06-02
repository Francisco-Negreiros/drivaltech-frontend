import { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const savedToken = localStorage.getItem('token');

  const [token, setToken] = useState(savedToken || null);

  const decodedToken = token ? jwtDecode(token) : null;

  const roles = decodedToken?.roles || [];

  const username = decodedToken?.sub || '';

  const isAdmin = roles.includes('ROLE_ADMIN');

  function login(newToken) {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        username,
        roles,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
