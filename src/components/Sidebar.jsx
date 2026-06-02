import { NavLink } from 'react-router-dom';
import { FaChartPie, FaExchangeAlt, FaTags } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Sidebar() {
  const { isAdmin, username } = useContext(AuthContext);
  const linkStyle = {
    padding: '12px',
    textDecoration: 'none',
    color: '#fff',
    borderRadius: '8px',
  };

  return (
    <div
      style={{
        width: '240px',
        minHeight: '100vh',
        background: '#1f2937',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        color: '#fff',
        transition: '0.2s',
      }}
    >
      <h2 style={{ marginBottom: '30px' }}>DrivalTech</h2>

      <NavLink
        to="/dashboard"
        style={({ isActive }) => ({
          ...linkStyle,
          background: isActive ? '#374151' : 'transparent',
          fontWeight: isActive ? 'bold' : 'normal',
        })}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaChartPie />
          Dashboard
        </div>
      </NavLink>

      <NavLink
        to="/transactions"
        style={({ isActive }) => ({
          ...linkStyle,
          background: isActive ? '#ddd' : 'transparent',
          fontWeight: isActive ? 'bold' : 'normal',
        })}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaExchangeAlt />
          Transactions
        </div>
      </NavLink>

      <NavLink
        to="/categories"
        style={({ isActive }) => ({
          ...linkStyle,
          background: isActive ? '#ddd' : 'transparent',
          fontWeight: isActive ? 'bold' : 'normal',
        })}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaTags />
          Categories
        </div>
      </NavLink>
      {isAdmin && (
        <NavLink
          to="/users"
          style={({ isActive }) => ({
            ...linkStyle,
            background: isActive ? '#374151' : 'transparent',
            fontWeight: isActive ? 'bold' : 'normal',
          })}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            👤 Users
          </div>
        </NavLink>
      )}
    </div>
  );
}
