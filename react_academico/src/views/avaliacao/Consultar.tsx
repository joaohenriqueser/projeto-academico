import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaArrowLeft } from 'react-icons/fa';
import { apiGetAvaliacaoById } from '../../services/avaliacao/api/api.avaliacao';
import { AVALIACAO } from '../../services/avaliacao/constants/avaliacao.constants';
import type { Avaliacao } from '../../services/avaliacao/type/Avaliacao';
import { ROTA } from '../../services/router/url';

export default function ConsultarAvaliacao() {
  const { idAvaliacao } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<Avaliacao | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (idAvaliacao) {
        try {
          setLoading(true);
          const res = await apiGetAvaliacaoById(Number(idAvaliacao));
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
  }, [idAvaliacao]);

  if (loading) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: 'center', padding: '3rem' }}>
          Carregando dados da avaliação...
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Avaliação não encontrada.</p>
          <button className="btn-base btn-secondary" onClick={() => navigate(ROTA.AVALIACAO.LISTAR)}>
            Voltar para a lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <div className="modern-card">
        <div className="card-top-bar" style={{ background: '#f59e0b' }}></div>
        <div className="card-body">
          <h2 className="card-title">
            <FaStar style={{ color: '#f59e0b' }} /> 
            {AVALIACAO.TITULO.CONSULTAR}
          </h2>

          <div style={{ marginTop: '20px' }}>
            <div className="grid-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div className="field-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>
                  {AVALIACAO.LABEL.ID}
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={model.idAvaliacao || ''}
                  readOnly
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>
              <div className="field-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>
                  {AVALIACAO.LABEL.DISCIPLINA}
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={model.disciplinaId || ''}
                  readOnly
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <div className="field-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>
                {AVALIACAO.LABEL.DESCRICAO}
              </label>
              <input
                type="text"
                className="input-field"
                value={model.descricao || ''}
                readOnly
                disabled
                style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
              />
            </div>

            <div className="form-actions" style={{ marginTop: '30px' }}>
              <button type="button" className="btn-base btn-secondary" onClick={() => navigate(ROTA.AVALIACAO.LISTAR)}>
                <FaArrowLeft size={14} /> Voltar para a lista
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
