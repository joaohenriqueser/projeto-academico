import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { http } from '../../services/axios/config.axios';
import { toast } from 'react-toastify';
import { FiLock, FiEye, FiEyeOff, FiCheck, FiX, FiAlertTriangle } from 'react-icons/fi';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  // Live validation checks
  const hasMinLength = password.length >= 6;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  
  const isFormValid = hasMinLength && hasSpecialChar && passwordsMatch && token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error('Preencha os requisitos de senha corretamente.');
      return;
    }

    setLoading(true);
    try {
      await http.post('/rest/auth/reset-password', { 
        token, 
        password, 
        confirmPassword 
      });
      toast.success('Senha redefinida com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.mensagem || error.response?.data?.message || 'Erro ao redefinir senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {!token ? (
          <div className="error-view">
            <div className="error-icon-wrapper">
              <FiAlertTriangle className="error-icon-large" />
            </div>
            <div className="login-header">
              <h1>Link Inválido</h1>
              <p>O token de recuperação de senha está ausente ou é inválido. Por favor, solicite um novo link de recuperação.</p>
            </div>
            <Link to="/forgot-password" className="login-button text-center" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
              Solicitar Novo Link
            </Link>
          </div>
        ) : (
          <>
            <div className="login-header">
              <h1>Redefinir Senha</h1>
              <p>Escolha uma nova senha segura para sua conta</p>
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

              {/* Live validation checklist */}
              <div className="validation-checklist">
                <p className="checklist-title">Requisitos da senha:</p>
                <ul>
                  <li className={hasMinLength ? 'valid' : 'invalid'}>
                    {hasMinLength ? <FiCheck className="check-icon" /> : <FiX className="x-icon" />}
                    <span>Pelo menos 6 caracteres</span>
                  </li>
                  <li className={hasSpecialChar ? 'valid' : 'invalid'}>
                    {hasSpecialChar ? <FiCheck className="check-icon" /> : <FiX className="x-icon" />}
                    <span>Pelo menos um caractere especial (ex: @, #, $, %)</span>
                  </li>
                  <li className={passwordsMatch ? 'valid' : 'invalid'}>
                    {passwordsMatch ? <FiCheck className="check-icon" /> : <FiX className="x-icon" />}
                    <span>As senhas coincidem</span>
                  </li>
                </ul>
              </div>

              <button 
                type="submit" 
                className="login-button" 
                disabled={loading || !isFormValid}
                style={{ marginTop: '16px' }}
              >
                {loading ? 'Redefinindo...' : 'Alterar Senha'}
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
        .error-view {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .error-icon-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 70px;
          height: 70px;
          background-color: #fff5f5;
          border-radius: 50%;
          margin-bottom: 24px;
        }
        .error-icon-large {
          font-size: 32px;
          color: #e53e3e;
        }
        .validation-checklist {
          background-color: #f7fafc;
          border: 1px solid #edf2f7;
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 13px;
          color: #4a5568;
        }
        .checklist-title {
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 8px;
        }
        .validation-checklist ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .validation-checklist li {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .validation-checklist li.valid {
          color: #2f855a;
        }
        .validation-checklist li.invalid {
          color: #a0aec0;
        }
        .check-icon {
          color: #48bb78;
        }
        .x-icon {
          color: #cbd5e0;
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;
