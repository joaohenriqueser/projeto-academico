import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from "../../services/axios/config.axios";
import { ROTA } from "../../services/router/url";
import { FaSave, FaUserPlus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

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

  const [message, setMessage] = useState<{ text: string, type: 'error' | 'success' } | null>(null);

  const handleChange = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    if (!formData.firstName || !formData.username || !formData.email || !formData.password) {
      setMessage({ text: "Por favor, preencha todos os campos obrigatórios (*)", type: 'error' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "As senhas não coincidem!", type: 'error' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ text: "Por favor, insira um e-mail válido!", type: 'error' });
      return;
    }

    try {
      await http.post(`/rest${ROTA.USUARIO.CRIAR}`, formData);
      setMessage({ text: `Usuário ${formData.firstName} cadastrado com sucesso!`, type: 'success' });
      setTimeout(() => navigate(ROTA.USUARIO.LISTAR), 2000);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Erro ao processar cadastro.";
      setMessage({ text: msg, type: 'error' });
    }
  };

  return (
    <div className="main-wrapper">
      <div className="modern-card">
        <div className="card-top-bar"></div>
        <div className="card-body">
          <h2 className="card-title">
            <FaUserPlus style={{ color: 'var(--primary)' }} /> 
            Novo Usuário
          </h2>
          
          <div className="grid-row">
            <div className="field-group">
              <label>Primeiro Nome <span>*</span></label>
              <input
                type="text"
                className="input-field"
                placeholder="Ex: João"
                value={formData.firstName}
                onChange={(e) => handleChange(e.target.value, 'firstName')}
              />
            </div>
            <div className="field-group">
              <label>Sobrenome <span>*</span></label>
              <input
                type="text"
                className="input-field"
                placeholder="Ex: Silva"
                value={formData.lastName}
                onChange={(e) => handleChange(e.target.value, 'lastName')}
              />
            </div>
          </div>

          <div className="grid-row">
            <div className="field-group">
              <label>Nome de Usuário <span>*</span></label>
              <input
                type="text"
                className="input-field"
                placeholder="joao.silva"
                value={formData.username}
                onChange={(e) => handleChange(e.target.value, 'username')}
              />
            </div>
            <div className="field-group">
              <label>E-mail <span>*</span></label>
              <input
                type="email"
                className="input-field"
                placeholder="email@exemplo.com"
                value={formData.email}
                onChange={(e) => handleChange(e.target.value, 'email')}
              />
            </div>
          </div>

          <div className="grid-row">
            <div className="field-group">
              <label>Senha <span>*</span></label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange(e.target.value, 'password')}
              />
            </div>
            <div className="field-group">
              <label>Confirmar Senha <span>*</span></label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleChange(e.target.value, 'confirmPassword')}
              />
            </div>
          </div>

          {message && (
            <div className={`alert-box ${message.type === 'error' ? 'alert-error' : 'alert-success'}`}>
              {message.text}
            </div>
          )}

          <div className="form-actions">
            <button className="btn-base btn-secondary" onClick={() => navigate(ROTA.USUARIO.LISTAR)}>
              <MdCancel size={18} /> Cancelar
            </button>
            <button className="btn-base btn-primary" onClick={handleSave}>
              <FaSave size={18} /> Salvar Usuário
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;