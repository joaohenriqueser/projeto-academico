import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetProfessorById } from '../../services/professor/api/api.professor';
import { PROFESSOR } from '../../services/professor/constants/professor.constants';
import type { Professor } from '../../services/professor/type/Professor';
import { useResources } from '../../services/providers/ResourcesProviders';
import { ROTA } from '../../services/router/url';

export default function ConsultarProfessor() {
  const { idProfessor } = useParams();
  const navigate = useNavigate();
  const { getEndpoint } = useResources();
  
  const url = useMemo(() => {
    return getEndpoint('professor');
  }, [getEndpoint]);

  const [model, setModel] = useState<Professor | null>(null);

  useEffect(() => {
    async function loadData() {
      if (idProfessor && url) {
        try {
          const res = await apiGetProfessorById(Number(idProfessor), url);
          setModel(res.data.dados);
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadData();
  }, [idProfessor, url]);

  if (!url) return <div className="display">Carregando recursos...</div>;
  if (!model) return <div className="display">Carregando dados...</div>;

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{PROFESSOR.TITULO.CONSULTAR}</h2>
        <div className="consultar-dados">
          <p><strong>{PROFESSOR.LABEL.ID}:</strong> {model.idProfessor}</p>
          <p><strong>{PROFESSOR.LABEL.CODIGO}:</strong> {model.codProfessor}</p>
          <p><strong>{PROFESSOR.LABEL.NOME}:</strong> {model.nomeProfessor}</p>
          <p><strong>{PROFESSOR.LABEL.USUARIO}:</strong> {model.idUsuario}</p>
        </div>
        <br />
        <div className="btn-content">
          <button type="button" className="btn btn-cancel" onClick={() => navigate(ROTA.PROFESSOR.LISTAR)}>Voltar</button>
        </div>
      </div>
    </div>
  );
}
