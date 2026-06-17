import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaChalkboardTeacher, FaArrowLeft } from 'react-icons/fa';
import { apiGetProfessorById } from '../../services/professor/api/api.professor';
import { PROFESSOR } from '../../services/professor/constants/professor.constants';
import type { Professor } from '../../services/professor/type/Professor';
import { ROTA } from '../../services/router/url';

export default function ConsultarProfessor() {
  const { idProfessor } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<Professor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (idProfessor) {
        try {
          setLoading(true);
          const res = await apiGetProfessorById(Number(idProfessor));
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
  }, [idProfessor]);

  if (loading) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: 'center', padding: '3rem' }}>
          Carregando dados do professor...
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Professor não encontrado.</p>
          <button className="btn-base btn-secondary" onClick={() => navigate(ROTA.PROFESSOR.LISTAR)}>
            Voltar para a lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <div className="modern-card">
        <div className="card-top-bar" style={{ background: '#4f46e5' }}></div>
        <div className="card-body">
          <h2 className="card-title">
            <FaChalkboardTeacher style={{ color: '#4f46e5' }} /> 
            {PROFESSOR.TITULO.CONSULTAR}
          </h2>

          <div style={{ marginTop: '20px' }}>
            <div className="grid-row">
              <div className="field-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>
                  {PROFESSOR.LABEL.ID}
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
              <div className="field-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>
                  {PROFESSOR.LABEL.CODIGO}
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={model.codProfessor || ''}
                  readOnly
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <div className="grid-row">
              <div className="field-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>
                  {PROFESSOR.LABEL.NOME}
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={model.nomeProfessor || ''}
                  readOnly
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>
              <div className="field-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>
                  {PROFESSOR.LABEL.USUARIO}
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
              <button type="button" className="btn-base btn-secondary" onClick={() => navigate(ROTA.PROFESSOR.LISTAR)}>
                <FaArrowLeft size={14} /> Voltar para a lista
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
