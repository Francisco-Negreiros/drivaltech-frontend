import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate('/dashboard');
  }

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default LoginPage;
