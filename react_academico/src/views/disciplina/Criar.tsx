import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaBook } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { apiCreateDisciplina } from '../../services/disciplina/api/api.disciplina';
import { ROTA } from '../../services/router/url';

export default function CriarDisciplina() {
  const navigate = useNavigate();
  const [model, setModel] = useState({
    periodo: 0,
    nomeDisciplina: '',
    idProfessor: 0,
  });

  const handleCreate = async () => {
    if (!model.nomeDisciplina || model.periodo <= 0) {
      alert("Preencha os campos obrigatórios corretamente!");
      return;
    }
    try {
      await apiCreateDisciplina(model);
      navigate(ROTA.DISCIPLINA.LISTAR);
    } catch (error) {
      console.error('Erro ao criar disciplina', error);
      alert('Erro ao criar disciplina');
    }
  };

  const handleInputChange = (value: string | number, name: string) => {
    setModel({ ...model, [name]: (name === 'idProfessor' || name === 'periodo') ? Number(value) : value });
  };

  return (
    <div className="main-wrapper">
      <div className="modern-card">
        <div className="card-top-bar" style={{ background: '#6366f1' }}></div>
        <div className="card-body">
          <h2 className="card-title">
            <FaBook style={{ color: '#6366f1' }} /> 
            Nova Disciplina
          </h2>
          
          <div className="grid-row">
            <div className="field-group">
              <label>Período Letivo <span>*</span></label>
              <input
                type="number"
                className="input-field"
                placeholder="Ex: 1"
                min="1"
                value={model.periodo}
                onChange={(e) => handleInputChange(e.target.value, 'periodo')}
              />
            </div>
            <div className="field-group">
              <label>Nome da Disciplina <span>*</span></label>
              <input
                type="text"
                className="input-field"
                placeholder="Ex: Estrutura de Dados"
                value={model.nomeDisciplina}
                onChange={(e) => handleInputChange(e.target.value, 'nomeDisciplina')}
              />
            </div>
          </div>

          <div className="field-group full-row">
            <label>ID do Professor Responsável <span>*</span></label>
            <input
              type="number"
              className="input-field"
              placeholder="Digite o ID do professor"
              value={model.idProfessor}
              onChange={(e) => handleInputChange(e.target.value, 'idProfessor')}
            />
          </div>

          <div className="form-actions">
            <button className="btn-base btn-secondary" onClick={() => navigate(ROTA.DISCIPLINA.LISTAR)}>
              <MdCancel size={18} /> Cancelar
            </button>
            <button className="btn-base btn-primary" style={{ background: '#6366f1' }} onClick={handleCreate}>
              <FaSave size={18} /> Salvar Disciplina
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
