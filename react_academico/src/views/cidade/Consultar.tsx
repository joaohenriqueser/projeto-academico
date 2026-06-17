import { useEffect, useState } from "react";
import { FaCity, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetCidade } from "../../services/cidade/api/api.cidade";
import type { Cidade } from "../../services/cidade/type/Cidade";
import { ROTA } from "../../services/router/url";

export default function ConsultarCidade() {
  const { idCidade } = useParams<{ idCidade: string }>();
  const navigate = useNavigate();
  const [model, setModel] = useState<Cidade | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCidade() {
      if (!idCidade) return;
      try {
        setLoading(true);
        const response = await apiGetCidade(idCidade);
        if (response.data && response.data.dados) {
          setModel(response.data.dados);
        }
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getCidade();
  }, [idCidade]);

  if (loading) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: "center", padding: "3rem" }}>
          Carregando dados da cidade...
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: "center", padding: "3rem" }}>
          <p>Cidade não encontrada.</p>
          <button className="btn-base btn-secondary" onClick={() => navigate(ROTA.CIDADE.LISTAR)}>
            Voltar para a lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <div className="modern-card">
        <div className="card-top-bar" style={{ background: '#0d6efd' }}></div>
        <div className="card-body">
          <h2 className="card-title">
            <FaCity style={{ color: '#0d6efd' }} /> 
            Consultar Cidade
          </h2>

          <div style={{ marginTop: '20px' }}>
            <div className="grid-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div className="field-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>ID da Cidade</label>
                <input
                  type="text"
                  className="input-field"
                  value={model.idCidade || ''}
                  readOnly
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>
              <div className="field-group">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>Código IBGE</label>
                <input
                  type="text"
                  className="input-field"
                  value={model.codCidade || ''}
                  readOnly
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <div className="field-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#4b5563' }}>Nome da Cidade</label>
              <input
                type="text"
                className="input-field"
                value={model.nomeCidade || ''}
                readOnly
                disabled
                style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
              />
            </div>

            <div className="form-actions" style={{ marginTop: '30px' }}>
              <button type="button" className="btn-base btn-secondary" onClick={() => navigate(ROTA.CIDADE.LISTAR)}>
                <FaArrowLeft size={14} /> Voltar para a lista
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
