import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { logout, username, isAdmin } = useContext(AuthContext);

  return (
    <div
      style={{
        width: '100%',
        height: '60px',
        background: '#111827',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        boxSizing: 'border-box',
      }}
    >
      {/* LEFT */}
      <h2 style={{ fontSize: '22px' }}>DrivalTech</h2>

      {/* RIGHT */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexShrink: 0,
        }}
      >
        <span>Usuário</span>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            marginRight: '15px',
            color: '#fff',
            fontSize: '14px',
          }}
        >
          <strong>{username}</strong>

          <span>{isAdmin ? '🛡️ ADMIN' : '👤 USER'}</span>
        </div>

        <button
          onClick={logout}
          style={{
            padding: '6px 12px',
            background: '#dc2626',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
