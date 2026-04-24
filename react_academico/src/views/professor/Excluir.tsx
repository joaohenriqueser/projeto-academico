import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiDeleteProfessor, apiGetProfessorById } from '../../services/professor/api/api.professor';
import { PROFESSOR } from '../../services/professor/constants/professor.constants';
import type { Professor } from '../../services/professor/type/Professor';
import { useResources } from '../../services/providers/ResourcesProviders';
import { ROTA } from '../../services/router/url';

export default function ExcluirProfessor() {
  const { idProfessor } = useParams();
  const navigate = useNavigate();

  const [model, setModel] = useState<Professor | null>(null);

  useEffect(() => {
    async function loadData() {
      if (idProfessor) {
        try {
          const res = await apiGetProfessorById(Number(idProfessor));
          if (res.data && res.data.dados) {
            setModel(res.data.dados);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadData();
  }, [idProfessor]);

  const handleDelete = async () => {
    if (idProfessor) {
      try {
        await apiDeleteProfessor(Number(idProfessor));
        navigate(ROTA.PROFESSOR.LISTAR);
      } catch (error) {
        console.error(error);
        alert('Erro ao excluir professor');
      }
    }
  };

  if (!model) return <div className="display">Carregando dados...</div>;

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{PROFESSOR.TITULO.EXCLUIR}</h2>
        <p>Tem certeza que deseja excluir o professor <strong>{model.nomeProfessor}</strong>?</p>
        <br />
        <div className="btn-content">
          <button type="button" className="btn btn-delete" onClick={handleDelete}>Excluir</button>
          <button type="button" className="btn btn-cancel" onClick={() => navigate(ROTA.PROFESSOR.LISTAR)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
