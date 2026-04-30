import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redireciona se já estiver autenticado
  React.useEffect(() => {
    if (isAuthenticated) {
      console.log('Usuário já autenticado, redirecionando para dashboard...');
      navigate('/sistema/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Bem-vindo ao sistema!');
      // A navegação será feita pelo useEffect acima
    } catch (error: any) {
      console.error('Erro no login:', error);
      const message = error.response?.data?.message || error.message || 'Erro ao realizar login.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Sistema Acadêmico</h1>
          <p>Entre com suas credenciais para continuar</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="label-wrapper">
              <label htmlFor="password">Senha</label>
              <Link to="/forgot-password" size="sm" className="forgot-link">
                Esqueceu a senha?
              </Link>
            </div>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Entrando...' : (
              <>
                <FiLogIn /> Entrar
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Ainda não tem uma conta? <Link to="/register">Cadastre-se</Link>
          </p>
        </div>
      </div>

      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }
        .login-box {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 400px;
        }
        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .login-header h1 {
          color: #333;
          font-size: 24px;
          margin-bottom: 8px;
        }
        .login-header p {
          color: #666;
          font-size: 14px;
        }
        .input-group {
          margin-bottom: 20px;
        }
        .input-group label {
          display: block;
          margin-bottom: 8px;
          color: #444;
          font-weight: 500;
          font-size: 14px;
        }
        .label-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 12px;
          color: #888;
        }
        input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.2s;
        }
        input:focus {
          border-color: #667eea;
          outline: none;
        }
        .forgot-link {
          font-size: 12px;
          color: #667eea;
          text-decoration: none;
        }
        .login-button {
          width: 100%;
          padding: 14px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.2s;
        }
        .login-button:hover {
          background: #5a6fd6;
        }
        .login-button:disabled {
          background: #aab7f1;
          cursor: not-allowed;
        }
        .login-footer {
          margin-top: 25px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
        .login-footer a {
          color: #667eea;
          font-weight: 600;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default Login;
