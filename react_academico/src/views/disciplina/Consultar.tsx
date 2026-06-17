import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaBook, FaArrowLeft } from 'react-icons/fa';
import { apiGetDisciplinaById } from '../../services/disciplina/api/api.disciplina';
import { DISCIPLINA } from '../../services/disciplina/constants/disciplina.constants';
import type { Disciplina } from '../../services/disciplina/type/Disciplina';
import { ROTA } from '../../services/router/url';

export default function ConsultarDisciplina() {
  const { idDisciplina } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<Disciplina | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (idDisciplina) {
        try {
          setLoading(true);
          const res = await apiGetDisciplinaById(Number(idDisciplina));
          if (res.data && res.data.dados) {
            setModel(res.data.dados);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    }
    loadData();
  }, [idDisciplina]);

  if (loading) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: 'center', padding: '3rem' }}>
          Carregando dados da disciplina...
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Disciplina não encontrada.</p>
          <button className="btn-base btn-secondary" onClick={() => navigate(ROTA.DISCIPLINA.LISTAR)}>
            Voltar para a lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <div className="modern-card">
        <div className="card-top-bar" style={{ background: '#0891b2' }}></div>
        <div className="card-body">
          <h2 className="card-title">
            <FaBook style={{ color: '#0891b2' }} /> 
            {DISCIPLINA.TITULO.CONSULTAR}
          </h2>

          <div style={{ marginTop: '20px' }}>
            <div className="grid-row">
              <div className="field-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>
                  {DISCIPLINA.LABEL.ID}
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={model.idDisciplina || ''}
                  readOnly
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>
              <div className="field-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>
                  {DISCIPLINA.LABEL.PERIODO}
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={model.periodo || ''}
                  readOnly
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <div className="grid-row">
              <div className="field-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>
                  {DISCIPLINA.LABEL.NOME}
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={model.nomeDisciplina || ''}
                  readOnly
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>
              <div className="field-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>
                  {DISCIPLINA.LABEL.PROFESSOR}
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={model.idProfessor || ''}
                  readOnly
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <div className="form-actions" style={{ marginTop: '30px' }}>
              <button type="button" className="btn-base btn-secondary" onClick={() => navigate(ROTA.DISCIPLINA.LISTAR)}>
                <FaArrowLeft size={14} /> Voltar para a lista
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
