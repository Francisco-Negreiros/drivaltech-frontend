import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/dashboard" style={styles.link}>
          Dashboard
        </Link>
        <Link to="/transactions" style={styles.link}>
          Transactions
        </Link>
        <Link to="/categories" style={styles.link}>
          Categories
        </Link>
      </div>

      <div style={styles.right}>
        <button onClick={logout} style={styles.button}>
          Sair
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
    backgroundColor: '#1f2937',
  },
  left: {
    display: 'flex',
    gap: '16px',
  },
  right: {},
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    cursor: 'pointer',
  },
};
