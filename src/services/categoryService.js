import api from '../api/client';

export async function getCategories() {
  const response = await api.get('/categories');
  return response.data;
}
