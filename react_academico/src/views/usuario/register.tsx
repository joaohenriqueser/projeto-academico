import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const [message, setMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.email || !formData.password) {
      return alert("Preencha os campos obrigatórios!");
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("As senhas não coincidem!");
    }

    try {
      const response = await axios.post('http://localhost:8000/rest/sistema/usuario/criar', formData);
      alert(`Usuário ${formData.firstName} cadastrado com sucesso!`);
      localStorage.setItem("usuarioLogado", formData.firstName || "Usuário");
      navigate('/sistema/usuario/listar');
    } catch (error: any) {
      const msg = error.response?.data?.message || "Erro ao cadastrar usuário. Verifique o console.";
      setMessage(msg);
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '25px', color: '#4a148c', textAlign: 'center' }}>
          Cadastro de Usuário
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <input 
              name="firstName" 
              value={formData.firstName} 
              placeholder="Primeiro Nome" 
              onChange={handleChange} 
              required 
              style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} 
            />
            <input 
              name="lastName" 
              value={formData.lastName} 
              placeholder="Sobrenome" 
              onChange={handleChange} 
              required 
              style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} 
            />
          </div>
          
          <input 
            name="username" 
            value={formData.username} 
            placeholder="Nome de Usuário (ex: joaosilva123)" 
            onChange={handleChange} 
            required 
            style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} 
          />
          
          <input 
            name="email" 
            value={formData.email} 
            type="email" 
            placeholder="E-mail" 
            onChange={handleChange} 
            required 
            style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} 
          />
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <input 
              name="password" 
              value={formData.password} 
              type="password" 
              placeholder="Senha" 
              onChange={handleChange} 
              required 
              style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} 
            />
            <input 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              type="password" 
              placeholder="Confirme a Senha" 
              onChange={handleChange} 
              required 
              style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} 
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-add" 
            style={{ marginTop: '10px', padding: '12px', fontSize: '16px', fontWeight: 'bold', width: '100%', justifyContent: 'center' }}
          >
            Concluir Cadastro
          </button>
        </form>
        
        {message && (
          <p style={{ marginTop: '20px', fontWeight: '500', textAlign: 'center', color: '#ff3333' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;