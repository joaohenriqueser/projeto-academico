import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaChalkboardTeacher } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { apiCreateProfessor } from '../../services/professor/api/api.professor';
import { ROTA } from '../../services/router/url';

export default function CriarProfessor() {
  const [model, setModel] = useState({
    codProfessor: '',
    nomeProfessor: '',
    idUsuario: 0,
  });

  const navigate = useNavigate();
  
  const handleCreate = async () => {
    if (!model.codProfessor || !model.nomeProfessor) {
      alert("Preencha os campos obrigatórios!");
      return;
    }
    try {
      await apiCreateProfessor(model);
      navigate(ROTA.PROFESSOR.LISTAR);
    } catch (error) {
      console.error('Erro ao criar professor', error);
      alert('Erro ao criar professor');
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
            <FaChalkboardTeacher style={{ color: 'var(--primary)' }} /> 
            Novo Professor
          </h2>
          
          <div className="grid-row">
            <div className="field-group">
              <label>Código do Professor <span>*</span></label>
              <input
                type="text"
                className="input-field"
                placeholder="Ex: PROF001"
                value={model.codProfessor}
                onChange={(e) => handleInputChange(e.target.value, 'codProfessor')}
              />
            </div>
            <div className="field-group">
              <label>Nome Completo <span>*</span></label>
              <input
                type="text"
                className="input-field"
                placeholder="Nome do professor"
                value={model.nomeProfessor}
                onChange={(e) => handleInputChange(e.target.value, 'nomeProfessor')}
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
            <button className="btn-base btn-secondary" onClick={() => navigate(ROTA.PROFESSOR.LISTAR)}>
              <MdCancel size={18} /> Cancelar
            </button>
            <button className="btn-base btn-primary" onClick={handleCreate}>
              <FaSave size={18} /> Salvar Professor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
