import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaBook } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { apiGetDisciplinaById, apiUpdateDisciplina } from '../../services/disciplina/api/api.disciplina';
import { ROTA } from '../../services/router/url';

export default function AlterarDisciplina() {
  const { idDisciplina } = useParams();
  const navigate = useNavigate();

  const [model, setModel] = useState({
    periodo: 0,
    nomeDisciplina: '',
    idProfessor: 0,
  });

  useEffect(() => {
    async function loadData() {
      if (idDisciplina) {
        try {
          const res = await apiGetDisciplinaById(Number(idDisciplina));
          if (res.data && res.data.dados) {
            setModel(res.data.dados);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadData();
  }, [idDisciplina]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiUpdateDisciplina(Number(idDisciplina), model);
      navigate(ROTA.DISCIPLINA.LISTAR);
    } catch (error) {
      console.error(error);
      alert('Erro ao alterar disciplina');
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
            Alterar Disciplina
          </h2>
          
          <form onSubmit={handleUpdate}>
            <div className="grid-row">
              <div className="field-group">
                <label>Período Letivo <span>*</span></label>
                <input
                  type="number"
                  className="input-field"
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
                value={model.idProfessor}
                onChange={(e) => handleInputChange(e.target.value, 'idProfessor')}
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-base btn-secondary" onClick={() => navigate(ROTA.DISCIPLINA.LISTAR)}>
                <MdCancel size={18} /> Cancelar
              </button>
              <button type="submit" className="btn-base btn-primary" style={{ background: '#6366f1' }}>
                <FaSave size={18} /> Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
