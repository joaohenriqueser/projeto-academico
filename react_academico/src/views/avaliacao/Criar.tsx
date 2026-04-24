import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaStar } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { apiCreateAvaliacao } from '../../services/avaliacao/api/api.avaliacao';
import { ROTA } from '../../services/router/url';

export default function CriarAvaliacao() {
  const navigate = useNavigate();
  const [model, setModel] = useState({
    descricao: '',
    disciplinaId: 0,
  });

  const handleCreate = async () => {
    if (!model.descricao || model.disciplinaId <= 0) {
      alert("Preencha os campos obrigatórios corretamente!");
      return;
    }
    try {
      await apiCreateAvaliacao(model);
      navigate(ROTA.AVALIACAO.LISTAR);
    } catch (error) {
      console.error('Erro ao criar avaliação', error);
      alert('Erro ao criar avaliação');
    }
  };

  const handleInputChange = (value: string | number, name: string) => {
    setModel({ ...model, [name]: name === 'disciplinaId' ? Number(value) : value });
  };

  return (
    <div className="main-wrapper">
      <div className="modern-card">
        <div className="card-top-bar" style={{ background: '#f59e0b' }}></div>
        <div className="card-body">
          <h2 className="card-title">
            <FaStar style={{ color: '#f59e0b' }} /> 
            Nova Avaliação
          </h2>
          
          <div className="field-group full-row">
            <label>Descrição da Avaliação <span>*</span></label>
            <input
              type="text"
              className="input-field"
              placeholder="Ex: Prova Bimestral 1"
              value={model.descricao}
              onChange={(e) => handleInputChange(e.target.value, 'descricao')}
            />
          </div>

          <div className="field-group full-row">
            <label>ID da Disciplina <span>*</span></label>
            <input
              type="number"
              className="input-field"
              placeholder="Digite o ID da disciplina"
              value={model.disciplinaId}
              onChange={(e) => handleInputChange(e.target.value, 'disciplinaId')}
            />
          </div>

          <div className="form-actions">
            <button className="btn-base btn-secondary" onClick={() => navigate(ROTA.AVALIACAO.LISTAR)}>
              <MdCancel size={18} /> Cancelar
            </button>
            <button className="btn-base btn-primary" style={{ background: '#f59e0b' }} onClick={handleCreate}>
              <FaSave size={18} /> Salvar Avaliação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
