import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from '../pages/DashboardPage';
import TransactionsPage from '../pages/TransactionsPage';
import CategoriesPage from '../pages/CategoriesPage';
import Layout from "../components/Layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Layout>
                <TransactionsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Layout>
                <CategoriesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
