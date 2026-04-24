import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetAvaliacaoById } from '../../services/avaliacao/api/api.avaliacao';
import { AVALIACAO } from '../../services/avaliacao/constants/avaliacao.constants';
import type { Avaliacao } from '../../services/avaliacao/type/Avaliacao';
import { useResources } from '../../services/providers/ResourcesProviders';
import { ROTA } from '../../services/router/url';

export default function ConsultarAvaliacao() {
  const { idAvaliacao } = useParams();
  const navigate = useNavigate();
  const { getEndpoint } = useResources();
  
  const url = useMemo(() => {
    return getEndpoint('avaliacao');
  }, [getEndpoint]);

  const [model, setModel] = useState<Avaliacao | null>(null);

  useEffect(() => {
    async function loadData() {
      if (idAvaliacao && url) {
        try {
          const res = await apiGetAvaliacaoById(Number(idAvaliacao), url);
          setModel(res.data.dados);
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadData();
  }, [idAvaliacao, url]);

  if (!url) return <div className="display">Carregando recursos...</div>;
  if (!model) return <div className="display">Carregando dados...</div>;

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{AVALIACAO.TITULO.CONSULTAR}</h2>
        <div className="consultar-dados">
          <p><strong>{AVALIACAO.LABEL.ID}:</strong> {model.idAvaliacao}</p>
          <p><strong>{AVALIACAO.LABEL.DESCRICAO}:</strong> {model.descricao}</p>
          <p><strong>{AVALIACAO.LABEL.DISCIPLINA}:</strong> {model.disciplinaId}</p>
        </div>
        <br />
        <div className="btn-content">
          <button type="button" className="btn btn-cancel" onClick={() => navigate(ROTA.AVALIACAO.LISTAR)}>Voltar</button>
        </div>
      </div>
    </div>
  );
}
