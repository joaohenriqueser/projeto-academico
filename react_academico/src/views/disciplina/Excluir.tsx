import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiDeleteDisciplina, apiGetDisciplinaById } from '../../services/disciplina/api/api.disciplina';
import { DISCIPLINA } from '../../services/disciplina/constants/disciplina.constants';
import type { Disciplina } from '../../services/disciplina/type/Disciplina';
import { useResources } from '../../services/providers/ResourcesProviders';
import { ROTA } from '../../services/router/url';

export default function ExcluirDisciplina() {
  const { idDisciplina } = useParams();
  const navigate = useNavigate();

  const [model, setModel] = useState<Disciplina | null>(null);

  useEffect(() => {
    async function loadData() {
      if (idDisciplina) {
        try {
          const res = await apiGetDisciplinaById(Number(idDisciplina));
          if (res.data && res.data.dados) {
            setModel(res.data.dados);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadData();
  }, [idDisciplina]);

  const handleDelete = async () => {
    if (idDisciplina) {
      try {
        await apiDeleteDisciplina(Number(idDisciplina));
        navigate(ROTA.DISCIPLINA.LISTAR);
      } catch (error) {
        console.error(error);
        alert('Erro ao excluir disciplina');
      }
    }
  };

  if (!model) return <div className="display">Carregando dados...</div>;

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{DISCIPLINA.TITULO.EXCLUIR}</h2>
        <p>Tem certeza que deseja excluir o disciplina <strong>{model.nomeDisciplina}</strong>?</p>
        <br />
        <div className="btn-content">
          <button type="button" className="btn btn-delete" onClick={handleDelete}>Excluir</button>
          <button type="button" className="btn btn-cancel" onClick={() => navigate(ROTA.DISCIPLINA.LISTAR)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
