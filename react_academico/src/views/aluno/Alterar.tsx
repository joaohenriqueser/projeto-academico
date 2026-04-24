import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaUserGraduate } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { apiGetAlunoById, apiUpdateAluno } from '../../services/aluno/api/api.aluno';
import { ROTA } from '../../services/router/url';

export default function AlterarAluno() {
  const { idAluno } = useParams();
  const navigate = useNavigate();

  const [model, setModel] = useState({
    codAluno: '',
    nomeAluno: '',
    idUsuario: 0,
  });

  useEffect(() => {
    async function loadData() {
      if (idAluno) {
        try {
          const res = await apiGetAlunoById(Number(idAluno));
          if (res.data && res.data.dados) {
            setModel(res.data.dados);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadData();
  }, [idAluno]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiUpdateAluno(Number(idAluno), model);
      navigate(ROTA.ALUNO.LISTAR);
    } catch (error) {
      console.error(error);
      alert('Erro ao alterar aluno');
    }
  };

  const handleInputChange = (value: string | number, name: string) => {
    setModel({ ...model, [name]: name === 'idUsuario' ? Number(value) : value });
  };

  return (
    <div className="main-wrapper">
      <div className="modern-card">
        <div className="card-top-bar" style={{ background: 'var(--brand)' }}></div>
        <div className="card-body">
          <h2 className="card-title">
            <FaUserGraduate style={{ color: 'var(--brand)' }} /> 
            Alterar Aluno
          </h2>
          
          <form onSubmit={handleUpdate}>
            <div className="grid-row">
              <div className="field-group">
                <label>RA do Aluno (Código) <span>*</span></label>
                <input
                  type="text"
                  className="input-field"
                  value={model.codAluno}
                  onChange={(e) => handleInputChange(e.target.value, 'codAluno')}
                />
              </div>
              <div className="field-group">
                <label>Nome do Aluno <span>*</span></label>
                <input
                  type="text"
                  className="input-field"
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
                value={model.idUsuario}
                onChange={(e) => handleInputChange(e.target.value, 'idUsuario')}
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-base btn-secondary" onClick={() => navigate(ROTA.ALUNO.LISTAR)}>
                <MdCancel size={18} /> Cancelar
              </button>
              <button type="submit" className="btn-base btn-primary">
                <FaSave size={18} /> Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
