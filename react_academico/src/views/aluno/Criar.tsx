import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaUserGraduate } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { apiCreateAluno } from '../../services/aluno/api/api.aluno';
import { ROTA } from '../../services/router/url';

export default function CriarAluno() {
  const navigate = useNavigate();
  const [model, setModel] = useState({
    codAluno: '',
    nomeAluno: '',
    idUsuario: 0,
  });

  const handleCreate = async () => {
    if (!model.codAluno || !model.nomeAluno) {
      alert("Preencha os campos obrigatórios!");
      return;
    }
    try {
      await apiCreateAluno(model);
      navigate(ROTA.ALUNO.LISTAR);
    } catch (error) {
      console.error('Erro ao criar aluno', error);
      alert('Erro ao criar aluno');
    }
  };

  const handleInputChange = (value: string | number, name: string) => {
    setModel({ ...model, [name]: name === 'idUsuario' ? Number(value) : value });
  };

  return (
    <div className="main-wrapper">
      <div className="modern-card">
        <div className="card-top-bar"></div>
        <div className="card-body">
          <h2 className="card-title">
            <FaUserGraduate style={{ color: 'var(--primary)' }} /> 
            Novo Aluno
          </h2>
          
          <div className="grid-row">
            <div className="field-group">
              <label>RA do Aluno (Código) <span>*</span></label>
              <input
                type="text"
                className="input-field"
                placeholder="Ex: RA123456"
                value={model.codAluno}
                onChange={(e) => handleInputChange(e.target.value, 'codAluno')}
              />
            </div>
            <div className="field-group">
              <label>Nome do Aluno <span>*</span></label>
              <input
                type="text"
                className="input-field"
                placeholder="Nome completo"
                value={model.nomeAluno}
                onChange={(e) => handleInputChange(e.target.value, 'nomeAluno')}
              />
            </div>
          </div>

          <div className="field-group full-row">
            <label>ID do Usuário Vinculado <span>*</span></label>
            <input
              type="number"
              className="input-field"
              placeholder="Digite o ID do usuário"
              value={model.idUsuario}
              onChange={(e) => handleInputChange(e.target.value, 'idUsuario')}
            />
          </div>

          <div className="form-actions">
            <button className="btn-base btn-secondary" onClick={() => navigate(ROTA.ALUNO.LISTAR)}>
              <MdCancel size={18} /> Cancelar
            </button>
            <button className="btn-base btn-primary" onClick={handleCreate}>
              <FaSave size={18} /> Salvar Aluno
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
