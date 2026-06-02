import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { UsersPage } from './pages/UsersPage';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
