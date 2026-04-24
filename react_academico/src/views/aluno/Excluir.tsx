import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiDeleteAluno, apiGetAlunoById } from '../../services/aluno/api/api.aluno';
import { ALUNO } from '../../services/aluno/constants/aluno.constants';
import type { Aluno } from '../../services/aluno/type/Aluno';
import { useResources } from '../../services/providers/ResourcesProviders';
import { ROTA } from '../../services/router/url';

export default function ExcluirAluno() {
  const { idAluno } = useParams();
  const navigate = useNavigate();

  const [model, setModel] = useState<Aluno | null>(null);

  useEffect(() => {
    async function loadData() {
      if (idAluno) {
        try {
          const res = await apiGetAlunoById(Number(idAluno));
          if (res.data && res.data.dados) {
            setModel(res.data.dados);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadData();
  }, [idAluno]);

  const handleDelete = async () => {
    if (idAluno) {
      try {
        await apiDeleteAluno(Number(idAluno));
        navigate(ROTA.ALUNO.LISTAR);
      } catch (error) {
        console.error(error);
        alert('Erro ao excluir aluno');
      }
    }
  };

  if (!model) return <div className="display">Carregando dados...</div>;

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{ALUNO.TITULO.EXCLUIR}</h2>
        <p>Tem certeza que deseja excluir o aluno <strong>{model.nomeAluno}</strong>?</p>
        <br />
        <div className="btn-content">
          <button type="button" className="btn btn-delete" onClick={handleDelete}>Excluir</button>
          <button type="button" className="btn btn-cancel" onClick={() => navigate(ROTA.ALUNO.LISTAR)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
