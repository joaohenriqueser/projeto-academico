import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetDisciplinaById } from '../../services/disciplina/api/api.disciplina';
import { DISCIPLINA } from '../../services/disciplina/constants/disciplina.constants';
import type { Disciplina } from '../../services/disciplina/type/Disciplina';
import { useResources } from '../../services/providers/ResourcesProviders';
import { ROTA } from '../../services/router/url';

export default function ConsultarDisciplina() {
  const { idDisciplina } = useParams();
  const navigate = useNavigate();
  const { getEndpoint } = useResources();
  
  const url = useMemo(() => {
    return getEndpoint('disciplina');
  }, [getEndpoint]);

  const [model, setModel] = useState<Disciplina | null>(null);

  useEffect(() => {
    async function loadData() {
      if (idDisciplina && url) {
        try {
          const res = await apiGetDisciplinaById(Number(idDisciplina), url);
          setModel(res.data.dados);
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadData();
  }, [idDisciplina, url]);

  if (!url) return <div className="display">Carregando recursos...</div>;
  if (!model) return <div className="display">Carregando dados...</div>;

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{DISCIPLINA.TITULO.CONSULTAR}</h2>
        <div className="consultar-dados">
          <p><strong>{DISCIPLINA.LABEL.ID}:</strong> {model.idDisciplina}</p>
          <p><strong>{DISCIPLINA.LABEL.PERIODO}:</strong> {model.periodo}</p>
          <p><strong>{DISCIPLINA.LABEL.NOME}:</strong> {model.nomeDisciplina}</p>
          <p><strong>{DISCIPLINA.LABEL.PROFESSOR}:</strong> {model.idProfessor}</p>
        </div>
        <br />
        <div className="btn-content">
          <button type="button" className="btn btn-cancel" onClick={() => navigate(ROTA.DISCIPLINA.LISTAR)}>Voltar</button>
        </div>
      </div>
    </div>
  );
}
