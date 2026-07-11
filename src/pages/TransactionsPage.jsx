import { useEffect, useState } from 'react';
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from '../services/transactionService';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import { getCategories } from '../services/categoryService';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'EXPENSE',
    date: '',
    categoryId: '',
  });

  // Função única para carregar dados
  async function loadTransactions() {
    try {
      const response = await getTransactions();
      console.log('DATA:', response);

      const list = response.data.data;

      setTransactions(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error('Failed to load transactions', error);
      setTransactions([]);
    }
  }

  useEffect(() => {
    loadTransactions();
    loadCategories();
  }, []);

  // Criar nova transação
  async function handleSubmit() {
    setLoading(true);
    setMessage('');
    setErrorMessage('');

    try {
      const payload = {
        ...formData,
        amount: Number(formData.amount),
      };

      if (isEditing) {
        await updateTransaction(editingId, payload);
        setMessage('Transaction updated successfully');
      } else {
        await createTransaction(payload);
        setMessage('Transaction created successfully');
      }

      await loadTransactions();

      setFormData({
        description: '',
        amount: '',
        type: 'EXPENSE',
        date: '',
        categoryId: '',
      });

      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      setErrorMessage('Failed to save transaction. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const response = await getCategories();
      console.log('CATEGORIES:', response);

      setCategories(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Failed to load categories', error);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this transaction?',
    );

    if (!confirmDelete) return;

    try {
      await deleteTransaction(id);

      await loadTransactions();
    } catch (error) {
      console.error('Failed to delete transaction', error);
    }
  }

  function handleEdit(transaction) {
    setFormData({
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      date: transaction.date?.substring(0, 10),
      categoryId: transaction.category?.id || '',
    });

    setEditingId(transaction.id);
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setFormData({
      description: '',
      amount: '',
      type: 'EXPENSE',
      date: '',
      categoryId: '',
    });

    setIsEditing(false);
    setEditingId(null);
  }

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container section">
      <h1 className="title">Transactions Management</h1>

      {/* BOTÃO */}

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* FORM */}

      <form
        className="admin-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h2>{isEditing ? 'Edit Transaction' : 'Create Transaction'}</h2>

        <div className="admin-form-group">
          <label>Description</label>

          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="admin-form-group">
          <label>Amount</label>

          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </div>

        <div className="admin-form-group">
          <label>Type</label>

          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="INCOME">INCOME</option>
            <option value="EXPENSE">EXPENSE</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label>Date</label>

          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div className="admin-form-group">
          <label>Category</label>

          <select
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
          >
            <option value="">Select a category</option>

            {Array.isArray(categories) &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleSubmit} disabled={loading}>
            {loading
              ? 'Saving...'
              : isEditing
                ? 'Update Transaction'
                : 'Create Transaction'}
          </button>

          <button
            type="button"
            className="button button-secondary"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        </div>
      </form>

      <div style={{ margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Search transaction..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <button
          type="button"
          className="button button-secondary"
          onClick={() => setSearchTerm('')}
        >
          Clear
        </button>

        <p className="results-count">
          {filteredTransactions.length} transaction
          {filteredTransactions.length === 1 ? '' : 's'} found
        </p>
      </div>

      {console.log('RENDER:', transactions)}
      {console.log('RENDER CATEGORIES:', categories)}

      {/* TABELA */}
      {filteredTransactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((t) => (
              <tr key={t.id}>
                <td>{t.description}</td>

                <td
                  style={{
                    color: t.type === 'INCOME' ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {t.type}
                </td>

                <td>{formatCurrency(t.amount)}</td>

                <td>{formatDate(t.date)}</td>

                <td style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="button button-edit"
                    onClick={() => handleEdit(t)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="button button-delete"
                    onClick={() => handleDelete(t.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
