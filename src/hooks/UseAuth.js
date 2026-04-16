import { useState } from 'react';
import * as authService from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState(null);

  async function signIn(username, password) {
    console.log('chamando API');
    const data = await authService.login(username, password);

    localStorage.setItem('token', data.token);

    setUser({ username });
  }

  function signOut() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return {
    user,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };
}
