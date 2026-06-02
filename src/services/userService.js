import api from '../api/client';

export async function getUsers() {
  const response = await api.get('/users');
  return response.data.data;
}

export async function deactivateUser(id) {
  await api.patch(`/users/${id}/deactivate`);
}

export async function reactivateUser(id) {
  await api.patch(`/users/${id}/reactivate`);
}

export async function createUser(userData) {
  const response = await api.post('/users', userData);

  return response.data;
}

export async function updateUser(id, userData) {
  const response = await api.put(`/users/${id}`, userData);

  return response.data;
}
