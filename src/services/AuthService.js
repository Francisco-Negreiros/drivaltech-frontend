import api from '../api/client';
import * as authService from '../services/authService';

export async function login(username, password) {
  const response = await api.post('/auth/login', {
    username,
    password,
  });

  return response.data;
}
