import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { http } from '../../services/axios/config.axios';
import { toast } from 'react-toastify';
import { FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';

const VerifyEmail: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus('error');
        return;
      }

      try {
        await http.get(`/rest/auth/verify-email?token=${token}`);
        setStatus('success');
        toast.success('E-mail verificado com sucesso!');
        setTimeout(() => navigate('/login'), 5000);
      } catch (error) {
        setStatus('error');
        toast.error('Token de verificação inválido ou expirado.');
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="status-content">
          {status === 'loading' && (
            <>
              <FiLoader className="status-icon loading-spin" />
              <h1>Verificando...</h1>
              <p>Estamos processando sua verificação de e-mail.</p>
            </>
          )}
          {status === 'success' && (
            <>
              <FiCheckCircle className="status-icon success" />
              <h1>Sucesso!</h1>
              <p>Seu e-mail foi verificado. Você será redirecionado em instantes.</p>
              <Link to="/login" className="login-button">Ir para Login</Link>
            </>
          )}
          {status === 'error' && (
            <>
              <FiXCircle className="status-icon error" />
              <h1>Ops!</h1>
              <p>O link de verificação é inválido ou já expirou.</p>
              <Link to="/login" className="login-button">Voltar ao Login</Link>
            </>
          )}
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
          text-align: center;
        }
        .status-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }
        .status-icon {
          font-size: 64px;
          margin-bottom: 10px;
        }
        .loading-spin {
          animation: spin 2s linear infinite;
          color: #667eea;
        }
        .success { color: #48bb78; }
        .error { color: #f56565; }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        h1 { color: #333; font-size: 24px; }
        p { color: #666; font-size: 16px; margin-bottom: 20px; }
        .login-button {
          width: 100%;
          padding: 14px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default VerifyEmail;
