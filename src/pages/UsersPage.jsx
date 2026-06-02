import { useEffect, useState } from 'react';
import {
  getUsers,
  deactivateUser,
  reactivateUser,
  createUser,
  updateUser,
} from '../services/userService';

export function UsersPage() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [editingUser, setEditingUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (!successMessage && !errorMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage, errorMessage]);

  async function loadUsers() {
    try {
      const data = await getUsers();

      console.log(data);

      setUsers(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  }

  async function handleDeactivate(id) {
    const confirmed = window.confirm(
      'Are you sure you want to deactivate this user?',
    );

    if (!confirmed) {
      return;
    }

    try {
      await deactivateUser(id);

      loadUsers();

      setErrorMessage('');

      setSuccessMessage('User deactivated successfully');
    } catch (error) {
      console.error(error);

      setSuccessMessage('');

      setErrorMessage('Error deactivating user');
    }
  }

  async function handleReactivate(id) {
    const confirmed = window.confirm(
      'Are you sure you want to reactivate this user?',
    );

    if (!confirmed) {
      return;
    }

    try {
      await reactivateUser(id);

      loadUsers();

      setErrorMessage('');

      setSuccessMessage('User reactivated successfully');
    } catch (error) {
      console.error(error);

      setSuccessMessage('');

      setErrorMessage('Error reactivating user');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editingUser) {
        await updateUser(editingUser.id, {
          username,
          roles: [role],
        });
      } else {
        await createUser({
          username,
          password,
          role,
        });
      }

      loadUsers();

      setErrorMessage('');

      setSuccessMessage(
        editingUser ? 'User updated successfully' : 'User created successfully',
      );

      setUsername('');
      setPassword('');
      setRole('USER');
      setEditingUser(null);
    } catch (error) {
      console.error(error);

      setSuccessMessage('');

      setErrorMessage(
        editingUser ? 'Error updating user' : 'Error creating user',
      );
    }
  }

  function handleEdit(user) {
    setEditingUser(user);

    setUsername(user.username);

    setRole(user.roles[0]);
  }

  function handleCancelEdit() {
    setEditingUser(null);

    setUsername('');
    setPassword('');
    setRole('USER');
  }

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container">
      <h1 className="title">Users Management</h1>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label>Username</label>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {!editingUser && (
          <div className="admin-form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}

        <div className="admin-form-group">
          <label>Role</label>

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="button button-primary">
            {editingUser ? 'Update User' : 'Create User'}
          </button>

          {editingUser && (
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

      <input
        type="text"
        placeholder="Search user..."
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

      <p className="results-count">{filteredUsers.length} user(s) found</p>

      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Roles</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>

                <td>{user.roles.join(', ')}</td>

                <td>{user.active ? '🟢 Active' : '🔴 Inactive'}</td>

                <td>
                  <button
                    className="button button-edit"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>

                  {user.active ? (
                    <button
                      className="button button-danger"
                      onClick={() => handleDeactivate(user.id)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="button button-primary"
                      onClick={() => handleReactivate(user.id)}
                    >
                      Reactivate
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
