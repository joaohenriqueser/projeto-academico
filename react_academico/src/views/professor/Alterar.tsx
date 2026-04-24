import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaChalkboardTeacher } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { apiGetProfessorById, apiUpdateProfessor } from '../../services/professor/api/api.professor';
import { ROTA } from '../../services/router/url';

export default function AlterarProfessor() {
  const { idProfessor } = useParams();
  const navigate = useNavigate();

  const [model, setModel] = useState({
    codProfessor: '',
    nomeProfessor: '',
    idUsuario: 0,
  });

  useEffect(() => {
    async function loadData() {
      if (idProfessor) {
        try {
          const res = await apiGetProfessorById(Number(idProfessor));
          if (res.data && res.data.dados) {
            setModel(res.data.dados);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadData();
  }, [idProfessor]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiUpdateProfessor(Number(idProfessor), model);
      navigate(ROTA.PROFESSOR.LISTAR);
    } catch (error) {
      console.error(error);
      alert('Erro ao alterar professor');
    }
  };

  const handleInputChange = (value: string | number, name: string) => {
    setModel({ ...model, [name]: name === 'idUsuario' ? Number(value) : value });
  };

  return (
    <div className="main-wrapper">
      <div className="modern-card">
        <div className="card-top-bar" style={{ background: '#4f46e5' }}></div>
        <div className="card-body">
          <h2 className="card-title">
            <FaChalkboardTeacher style={{ color: '#4f46e5' }} /> 
            Alterar Professor
          </h2>
          
          <form onSubmit={handleUpdate}>
            <div className="grid-row">
              <div className="field-group">
                <label>Código do Professor <span>*</span></label>
                <input
                  type="text"
                  className="input-field"
                  value={model.codProfessor}
                  onChange={(e) => handleInputChange(e.target.value, 'codProfessor')}
                />
              </div>
              <div className="field-group">
                <label>Nome Completo <span>*</span></label>
                <input
                  type="text"
                  className="input-field"
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
                value={model.idUsuario}
                onChange={(e) => handleInputChange(e.target.value, 'idUsuario')}
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-base btn-secondary" onClick={() => navigate(ROTA.PROFESSOR.LISTAR)}>
                <MdCancel size={18} /> Cancelar
              </button>
              <button type="submit" className="btn-base btn-primary" style={{ background: '#4f46e5' }}>
                <FaSave size={18} /> Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
