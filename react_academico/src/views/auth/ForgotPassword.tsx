import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { http } from '../../services/axios/config.axios';
import { toast } from 'react-toastify';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await http.post('/rest/auth/forgot-password', { email });
      toast.success('E-mail de recuperação enviado com sucesso!');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao processar solicitação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Link to="/login" className="back-link">
          <FiArrowLeft /> Voltar para o login
        </Link>
        <div className="login-header">
          <h1>Recuperar Senha</h1>
          <p>Informe seu e-mail para receber as instruções</p>
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

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
          </button>
        </form>
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
        .back-link {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #667eea;
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 20px;
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
          transition: background 0.2s;
        }
        .login-button:hover {
          background: #5a6fd6;
        }
        .login-button:disabled {
          background: #aab7f1;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
