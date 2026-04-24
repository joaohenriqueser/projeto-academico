import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaStar } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { apiGetAvaliacaoById, apiUpdateAvaliacao } from '../../services/avaliacao/api/api.avaliacao';
import { useResources } from '../../services/providers/ResourcesProviders';
import { ROTA } from '../../services/router/url';

export default function AlterarAvaliacao() {
  const { idAvaliacao } = useParams();
  const navigate = useNavigate();
  const { getEndpoint } = useResources();
  
  const url = useMemo(() => {
    return getEndpoint('avaliacao');
  }, [getEndpoint]);

  const [model, setModel] = useState({
    descricao: '',
    disciplinaId: 0,
  });

  useEffect(() => {
    async function loadData() {
      if (idAvaliacao && url) {
        try {
          const res = await apiGetAvaliacaoById(Number(idAvaliacao), url);
          if (res.data && res.data.dados) {
            setModel(res.data.dados);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadData();
  }, [idAvaliacao, url]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      alert('Recursos da API não carregados.');
      return;
    }
    try {
      await apiUpdateAvaliacao(Number(idAvaliacao), model, url);
      navigate(ROTA.AVALIACAO.LISTAR);
    } catch (error) {
      console.error(error);
      alert('Erro ao alterar avaliação');
    }
  };

  const handleInputChange = (value: string | number, name: string) => {
    setModel({ ...model, [name]: name === 'disciplinaId' ? Number(value) : value });
  };

  if (!url) {
    return <div className="list-container" style={{ textAlign: 'center', padding: '5rem' }}>Carregando recursos...</div>;
  }

  return (
    <div className="main-wrapper">
      <div className="modern-card">
        <div className="card-top-bar" style={{ background: '#f59e0b' }}></div>
        <div className="card-body">
          <h2 className="card-title">
            <FaStar style={{ color: '#f59e0b' }} /> 
            Alterar Avaliação
          </h2>
          
          <form onSubmit={handleUpdate}>
            <div className="field-group full-row">
              <label>Descrição da Avaliação <span>*</span></label>
              <input
                type="text"
                className="input-field"
                value={model.descricao}
                onChange={(e) => handleInputChange(e.target.value, 'descricao')}
              />
            </div>

            <div className="field-group full-row">
              <label>ID da Disciplina <span>*</span></label>
              <input
                type="number"
                className="input-field"
                value={model.disciplinaId}
                onChange={(e) => handleInputChange(e.target.value, 'disciplinaId')}
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-base btn-secondary" onClick={() => navigate(ROTA.AVALIACAO.LISTAR)}>
                <MdCancel size={18} /> Cancelar
              </button>
              <button type="submit" className="btn-base btn-primary" style={{ background: '#f59e0b' }}>
                <FaSave size={18} /> Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
