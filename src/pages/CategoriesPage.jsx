import { useEffect, useState } from 'react';
import { getCategories } from '../services/categoryService';
import Navbar from '../components/Navbar';
import { createCategory } from '../services/categoryService';
import { deleteCategory } from '../services/categoryService';
import { updateCategory } from '../services/categoryService';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('INCOME');
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      console.log('CATEGORIES:', data);
      setCategories(data || []);
    } catch (error) {
      console.error('Erro ao carregar categorias', error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, { name, type });
      } else {
        await createCategory({ name, type });
      }

      setName('');
      setType('INCOME');
      setEditingCategory(null);

      loadCategories();
    } catch (error) {
      console.error('Erro ao salvar categoria', error);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteCategory(id);
      loadCategories(); // recarrega lista
    } catch (error) {
      console.error('Erro ao deletar categoria', error);
    }
  }

  function handleEdit(category) {
    setName(category.name);
    setType(category.type);
    setEditingCategory(category);
  }

  return (
    <>
      <Navbar />

      <div>
        <h1>Categories</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nova categoria"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>

          <button type="submit">
            {editingCategory ? 'Atualizar' : 'Adicionar'}
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories?.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>

                <td>
                  <span
                    style={{
                      color: category.type === 'INCOME' ? 'green' : 'red',
                    }}
                  >
                    {category.type}
                  </span>
                </td>

                <td>
                  <button onClick={() => handleEdit(category)}>Edit</button>

                  <button onClick={() => handleDelete(category.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
