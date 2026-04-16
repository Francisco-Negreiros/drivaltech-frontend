import api from '../api/client';

export async function login(username, password) {
  const response = await api.post('/auth/login', {
    username,
    password,
  });

  return response.data;
}
