import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUserGraduate, FaArrowLeft } from 'react-icons/fa';
import { apiGetAlunoById } from '../../services/aluno/api/api.aluno';
import { ALUNO } from '../../services/aluno/constants/aluno.constants';
import type { Aluno } from '../../services/aluno/type/Aluno';
import { ROTA } from '../../services/router/url';

export default function ConsultarAluno() {
  const { idAluno } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (idAluno) {
        try {
          setLoading(true);
          const res = await apiGetAlunoById(Number(idAluno));
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
  }, [idAluno]);

  if (loading) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: 'center', padding: '3rem' }}>
          Carregando dados do aluno...
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Aluno não encontrado.</p>
          <button className="btn-base btn-secondary" onClick={() => navigate(ROTA.ALUNO.LISTAR)}>
            Voltar para a lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <div className="modern-card">
        <div className="card-top-bar" style={{ background: 'var(--brand)' }}></div>
        <div className="card-body">
          <h2 className="card-title">
            <FaUserGraduate style={{ color: 'var(--brand)' }} /> 
            {ALUNO.TITULO.CONSULTAR}
          </h2>

          <div style={{ marginTop: '20px' }}>
            <div className="grid-row">
              <div className="field-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>
                  {ALUNO.LABEL.ID}
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={model.idAluno || ''}
                  readOnly
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>
              <div className="field-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>
                  {ALUNO.LABEL.CODIGO}
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={model.codAluno || ''}
                  readOnly
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <div className="grid-row">
              <div className="field-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>
                  {ALUNO.LABEL.NOME}
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={model.nomeAluno || ''}
                  readOnly
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>
              <div className="field-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>
                  {ALUNO.LABEL.USUARIO}
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={model.idUsuario || ''}
                  readOnly
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <div className="form-actions" style={{ marginTop: '30px' }}>
              <button type="button" className="btn-base btn-secondary" onClick={() => navigate(ROTA.ALUNO.LISTAR)}>
                <FaArrowLeft size={14} /> Voltar para a lista
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
