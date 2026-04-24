import api from '../api/client';

export async function getCategories() {
  const response = await api.get('/categories');
  return response.data;
}

export async function createCategory(category) {
  const response = await api.post('/categories', category);
  return response.data;
}

export async function updateCategory(id, category) {
  const response = await api.put(`/categories/${id}`, category);
  return response.data;
}

export async function deleteCategory(id) {
  const response = await api.delete(`/categories/${id}`);
}
