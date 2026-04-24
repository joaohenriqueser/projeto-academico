import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetAlunoById } from '../../services/aluno/api/api.aluno';
import { ALUNO } from '../../services/aluno/constants/aluno.constants';
import type { Aluno } from '../../services/aluno/type/Aluno';
import { useResources } from '../../services/providers/ResourcesProviders';
import { ROTA } from '../../services/router/url';

export default function ConsultarAluno() {
  const { idAluno } = useParams();
  const navigate = useNavigate();
  const { getEndpoint } = useResources();
  
  const url = useMemo(() => {
    return getEndpoint('aluno');
  }, [getEndpoint]);

  const [model, setModel] = useState<Aluno | null>(null);

  useEffect(() => {
    async function loadData() {
      if (idAluno && url) {
        try {
          const res = await apiGetAlunoById(Number(idAluno), url);
          setModel(res.data.dados);
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadData();
  }, [idAluno, url]);

  if (!url) return <div className="display">Carregando recursos...</div>;
  if (!model) return <div className="display">Carregando dados...</div>;

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{ALUNO.TITULO.CONSULTAR}</h2>
        <div className="consultar-dados">
          <p><strong>{ALUNO.LABEL.ID}:</strong> {model.idAluno}</p>
          <p><strong>{ALUNO.LABEL.CODIGO}:</strong> {model.codAluno}</p>
          <p><strong>{ALUNO.LABEL.NOME}:</strong> {model.nomeAluno}</p>
          <p><strong>{ALUNO.LABEL.USUARIO}:</strong> {model.idUsuario}</p>
        </div>
        <br />
        <div className="btn-content">
          <button type="button" className="btn btn-cancel" onClick={() => navigate(ROTA.ALUNO.LISTAR)}>Voltar</button>
        </div>
      </div>
    </div>
  );
}
