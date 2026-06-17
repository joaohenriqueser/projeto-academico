import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { http } from '../../services/axios/config.axios';
import { toast } from 'react-toastify';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await http.post('/rest/auth/forgot-password', { email });
      toast.success('Solicitação processada com sucesso!');
      setIsSubmitted(true);
    } catch (error: any) {
      toast.error(error.response?.data?.mensagem || error.response?.data?.message || 'Erro ao processar solicitação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {isSubmitted ? (
          <div className="success-view">
            <div className="success-icon-wrapper">
              <FiMail className="success-icon-large" />
            </div>
            <div className="login-header">
              <h1>Verifique seu E-mail</h1>
              <p>
                Se o e-mail <strong>{email}</strong> estiver cadastrado em nosso sistema, você receberá um link contendo instruções para redefinir sua senha em instantes.
              </p>
            </div>
            <div className="success-instructions">
              <p>Por favor, verifique:</p>
              <ul>
                <li>Sua caixa de entrada principal.</li>
                <li>As pastas de Spam ou Lixo eletrônico.</li>
                <li>O link enviado expira em 15 minutos.</li>
              </ul>
            </div>
            <Link to="/login" className="back-link" style={{ justifyContent: 'center', marginTop: '24px', marginBottom: 0 }}>
              <FiArrowLeft /> Voltar para o login
            </Link>
          </div>
        ) : (
          <>
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
          </>
        )}
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
          line-height: 1.5;
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
        .success-view {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .success-icon-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 70px;
          height: 70px;
          background-color: #ebf8ff;
          border-radius: 50%;
          margin-bottom: 24px;
        }
        .success-icon-large {
          font-size: 32px;
          color: #3182ce;
        }
        .success-instructions {
          background-color: #f7fafc;
          border-radius: 8px;
          padding: 16px;
          width: 100%;
          font-size: 13px;
          color: #4a5568;
          border: 1px solid #edf2f7;
        }
        .success-instructions p {
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 8px;
        }
        .success-instructions ul {
          margin: 0;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
