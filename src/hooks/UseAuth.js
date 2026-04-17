import { useState } from 'react';
import * as authService from '../services/authService';

export default function useAuth() {
  const [user, setUser] = useState(null);

  async function login(username, password) {
    console.log('chamando API');
    const data = await authService.login(username, password);

    localStorage.setItem('token', data.token);
    setUser({ username });
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  }

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
