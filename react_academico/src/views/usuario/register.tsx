import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { http } from "../../services/axios/config.axios";
import { ROTA } from "../../services/router/url";
import { FiUser, FiMail, FiLock, FiUserPlus, FiArrowLeft, FiCheckCircle, FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Live validation checks
  const hasMinLength = formData.password.length >= 6;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(formData.password);
  const passwordsMatch = formData.password.length > 0 && formData.password === formData.confirmPassword;
  
  const isFormValid = hasMinLength && hasSpecialChar && passwordsMatch && formData.firstName && formData.lastName && formData.username && formData.email;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }

    setLoading(true);
    try {
      await http.post(`/rest${ROTA.USUARIO.CRIAR}`, formData);
      setSuccess(true);
    } catch (error: any) {
      const msg = error.response?.data?.mensagem || error.response?.data?.message || "Erro ao processar cadastro.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {success ? (
        <div className="login-box" style={{ maxWidth: '550px', textAlign: 'center' }}>
          <FiCheckCircle style={{ fontSize: '72px', color: '#4CAF50', marginBottom: '20px' }} />
          <h2 style={{ color: '#333', marginBottom: '15px', fontSize: '28px' }}>Cadastro Concluído!</h2>
          <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #b6e0fe', padding: '24px', borderRadius: '12px', marginBottom: '30px' }}>
             <p style={{ color: '#0369a1', lineHeight: '1.6', margin: 0, fontSize: '16px' }}>
               Enviamos um e-mail de ativação para <strong>{formData.email}</strong>.<br/><br/>
               Por favor, verifique sua caixa de entrada e clique no link para ativar sua conta e poder acessar o sistema. Caso não o encontre, não se esqueça de verificar também a pasta de <strong>spam</strong>.
             </p>
          </div>
          <Link to="/login" className="login-button" style={{ display: 'inline-block', textDecoration: 'none', padding: '14px 30px', width: 'auto', borderRadius: '8px' }}>
            Ir para a página de Login
          </Link>
        </div>
      ) : (
      <div className="login-box" style={{ maxWidth: '550px' }}>
        <Link to="/login" className="back-link">
          <FiArrowLeft /> Voltar para o login
        </Link>
        
        <div className="login-header">
          <h1>Crie sua Conta</h1>
          <p>Preencha os dados abaixo para se cadastrar no sistema</p>
        </div>
        
        <form onSubmit={handleSave}>
          <div className="grid-row">
            <div className="input-group">
              <label htmlFor="firstName">Primeiro Nome</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Ex: João"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Sobrenome</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Ex: Silva"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid-row">
            <div className="input-group">
              <label htmlFor="username">Usuário</label>
              <div className="input-wrapper">
                <FiUserPlus className="input-icon" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="joao.silva"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid-row">
            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
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
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
          </div>

          {/* Live validation checklist */}
          <div className="validation-checklist" style={{ marginBottom: '20px' }}>
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

          <button type="submit" className="login-button" disabled={loading || !isFormValid} style={{ marginTop: '10px' }}>
            {loading ? 'Cadastrando...' : 'Criar minha conta'}
          </button>
        </form>
      </div>
      )}

      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          font-family: 'Inter', sans-serif;
        }
        .login-box {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          width: 100%;
        }
        .back-link {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #667eea;
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 20px;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: #5a6fd6;
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
        .grid-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 5px;
        }
        @media (max-width: 600px) {
          .grid-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
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
          font-size: 15px;
          transition: all 0.2s;
        }
        input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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

export default Register;