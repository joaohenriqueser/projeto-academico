import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { http } from '../../services/axios/config.axios';
import { toast } from 'react-toastify';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem.');
      return;
    }

    if (!token) {
      toast.error('Token inválido ou ausente.');
      return;
    }

    setLoading(true);
    try {
      await http.post('/rest/auth/reset-password', { token, newPassword: password });
      toast.success('Senha redefinida com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao redefinir senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Redefinir Senha</h1>
          <p>Escolha uma nova senha segura</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="password">Nova Senha</label>
             <div className="input-wrapper">
               <FiLock className="input-icon" />
               <input
                 id="password"
                 type={showPassword ? "text" : "password"}
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="••••••••"
                 required
               />
               <button
                 type="button"
                 className="password-toggle"
                 onClick={() => setShowPassword(!showPassword)}
                 tabIndex={-1}
               >
                 {showPassword ? <FiEyeOff /> : <FiEye />}
               </button>
             </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
             <div className="input-wrapper">
               <FiLock className="input-icon" />
               <input
                 id="confirmPassword"
                 type={showConfirmPassword ? "text" : "password"}
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 placeholder="••••••••"
                 required
               />
               <button
                 type="button"
                 className="password-toggle"
                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                 tabIndex={-1}
               >
                 {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
               </button>
             </div>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Redefinindo...' : 'Alterar Senha'}
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
        input::-ms-reveal,
        input::-ms-clear {
          display: none;
        }
        .password-toggle {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          font-size: 18px;
          transition: color 0.2s;
        }
        .password-toggle:hover {
          color: #667eea;
        }
        input[type="password"], 
        input[type="text"] {
          padding-right: 40px;
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

export default ResetPassword;
