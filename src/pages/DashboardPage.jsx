import { useEffect, useState, useContext } from 'react';
import { getSummary } from '../services/DashboardService';
import { formatCurrency } from '../utils/formatCurrency';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);

  const { logout } = useContext(AuthContext);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getSummary();
        setSummary(data);
      } catch (error) {
        console.error('Erro ao carregar dashboard', error);
      }
    }

    loadData();
  }, []);

  if (!summary) {
    return <h2>Carregando...</h2>;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="title">Dashboard</h1>

        <div className="card-container">
          <div className="card income">
            <h2>Income</h2>
            <p>{formatCurrency(summary.income)}</p>
          </div>

          <div className="card expense">
            <h2>Expense</h2>
            <p>{formatCurrency(summary.expense)}</p>
          </div>

          <div className="card balance">
            <h2>Balance</h2>
            <p>{formatCurrency(summary.balance)}</p>
          </div>
        </div>
      </div>
    </>
  );
}
