import api from '../api/client';

// GET
export async function getTransactions() {
  const response = await api.get('/transactions');
  return response;
}

// POST
export async function createTransaction(data) {
  const response = await api.post('/transactions', data);
  return response.data;
}

// DELETE
export async function deleteTransaction(id) {
  return await api.delete(`/transactions/${id}`);
}

// PUT
export async function updateTransaction(id, data) {
  return await api.put(`/transactions/${id}`, data);
}
