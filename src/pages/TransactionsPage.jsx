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
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'EXPENSE',
    date: '',
    categoryId: '',
  });

  // 🔥 Função única para carregar dados
  async function loadTransactions() {
    try {
      const response = await getTransactions();
      console.log('DATA:', response);

      const list = response.data.data;

      setTransactions(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error('Erro ao carregar transações', error);
      setTransactions([]);
    }
  }

  useEffect(() => {
    loadTransactions();
    loadCategories();
  }, []);

  // 🔥 Criar nova transação
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
        setMessage('Transação atualizada com sucesso!');
      } else {
        await createTransaction(payload);
        setMessage('Transação criada com sucesso!');
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
      setShowForm(false);
    } catch (error) {
      setErrorMessage('Erro ao salvar transação');
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
      console.error('Erro ao carregar categorias', error);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir?');

    if (!confirmDelete) return;

    try {
      await deleteTransaction(id);

      await loadTransactions();
    } catch (error) {
      console.error('Erro ao excluir', error);
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
    setShowForm(true);
  }

  return (
    <div className="container">
      <h1>Transactions</h1>

      {/* BOTÃO */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowForm(true)}>+ Nova Transação</button>
      </div>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* FORM */}
      {showForm && (
        <div className="form">
          <h2>Nova Transação</h2>

          <input
            placeholder="Descrição"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Valor"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />

          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="INCOME">INCOME</option>
            <option value="EXPENSE">EXPENSE</option>
          </select>

          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />

          <select
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
          >
            <option value="">Selecione uma categoria</option>

            {Array.isArray(categories) &&
              categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Salvando...' : isEditing ? 'Atualizar' : 'Salvar'}
            </button>

            <button onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {console.log('RENDER:', transactions)}
      {console.log('RENDER CATEGORIES:', categories)}

      {/* TABELA */}
      {transactions.length === 0 ? (
        <p>Nenhuma transação encontrada</p>
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
            {transactions.map((t) => (
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
                  <button onClick={() => handleEdit(t)}>✏️ Editar</button>
                  <button onClick={() => handleDelete(t.id)}>🗑️ Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
