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
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      console.log('CATEGORIES:', data);
      setCategories(data || []);
    } catch (error) {
      console.error('Failed to load categories', error);
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
      console.error('Failed to save category', error);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this category?',
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCategory(id);
      loadCategories();
    } catch (error) {
      console.error('Failed to delete category', error);
    }
  }

  function handleEdit(category) {
    setName(category.name);
    setType(category.type);
    setEditingCategory(category);
  }

  function handleCancelEdit() {
    setName('');
    setType('INCOME');
    setEditingCategory(null);
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container">
      <h1 className="title">Categories Management</h1>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label>Name</label>

          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="admin-form-group">
          <label>Type</label>

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="button button-primary">
            {editingCategory ? 'Update Category' : 'Create Category'}
          </button>

          {editingCategory && (
            <button
              type="button"
              className="button button-secondary"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div style={{ margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Search category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <button
          type="button"
          className="button button-secondary"
          onClick={() => setSearchTerm('')}
          style={{ marginLeft: '10px' }}
        >
          Clear
        </button>

        <p className="results-count">
          {filteredCategories.length} categor
          {filteredCategories.length === 1 ? 'y' : 'ies'} found
        </p>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredCategories.length === 0 ? (
            <tr>
              <td
                colSpan="3"
                style={{
                  textAlign: 'center',
                  padding: '20px',
                }}
              >
                No categories found
              </td>
            </tr>
          ) : (
            filteredCategories.map((category) => (
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

                <td style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="button button-edit"
                    onClick={() => handleEdit(category)}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="button button-delete"
                    onClick={() => handleDelete(category.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
