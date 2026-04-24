import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiDeleteAvaliacao, apiGetAvaliacaoById } from '../../services/avaliacao/api/api.avaliacao';
import { AVALIACAO } from '../../services/avaliacao/constants/avaliacao.constants';
import type { Avaliacao } from '../../services/avaliacao/type/Avaliacao';
import { useResources } from '../../services/providers/ResourcesProviders';
import { ROTA } from '../../services/router/url';

export default function ExcluirAvaliacao() {
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

  const handleDelete = async () => {
    if (idAvaliacao && url) {
      try {
        await apiDeleteAvaliacao(Number(idAvaliacao), url);
        navigate(ROTA.AVALIACAO.LISTAR);
      } catch (error) {
        console.error(error);
        alert('Erro ao excluir avaliacao');
      }
    }
  };

  if (!url) return <div className="display">Carregando recursos...</div>;
  if (!model) return <div className="display">Carregando dados...</div>;

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{AVALIACAO.TITULO.EXCLUIR}</h2>
        <p>Tem certeza que deseja excluir o avaliacao <strong>{model.descricao}</strong>?</p>
        <br />
        <div className="btn-content">
          <button type="button" className="btn btn-delete" onClick={handleDelete}>Excluir</button>
          <button type="button" className="btn btn-cancel" onClick={() => navigate(ROTA.AVALIACAO.LISTAR)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
