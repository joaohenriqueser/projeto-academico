import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTrash, FaUserGraduate } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { toast } from 'react-toastify';
import { apiDeleteAluno, apiGetAlunoById } from '../../services/aluno/api/api.aluno';
import { ALUNO } from '../../services/aluno/constants/aluno.constants';
import type { Aluno } from '../../services/aluno/type/Aluno';
import { ROTA } from '../../services/router/url';

export default function ExcluirAluno() {
  const { idAluno } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (idAluno) {
        try {
          setLoading(true);
          const res = await apiGetAlunoById(Number(idAluno));
          if (res.data && res.data.dados) {
            setModel(res.data.dados);
          }
        } catch (error) {
          console.error(error);
          toast.error("Erro ao carregar dados do aluno.");
        } finally {
          setLoading(false);
        }
      }
    }
    loadData();
  }, [idAluno]);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (idAluno) {
      try {
        await apiDeleteAluno(Number(idAluno));
        toast.success("Aluno excluído com sucesso!");
        navigate(ROTA.ALUNO.LISTAR);
      } catch (error: any) {
        console.error(error);
        const msg = error.response?.data?.mensagem || error.response?.data?.message || "Erro ao excluir aluno.";
        toast.error(msg);
      }
    }
  };

  if (loading) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: "center", padding: "3rem" }}>
          Carregando dados do aluno...
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: "center", padding: "3rem" }}>
          <p>Aluno não encontrado.</p>
          <button className="btn-base btn-secondary" onClick={() => navigate(ROTA.ALUNO.LISTAR)}>
            Voltar para a lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <div className="modern-card">
        <div className="card-top-bar" style={{ background: '#ef4444' }}></div>
        <div className="card-body">
          <h2 className="card-title" style={{ color: '#ef4444' }}>
            <FaUserGraduate /> 
            {ALUNO.TITULO.EXCLUIR}
          </h2>
          
          <form onSubmit={handleDelete}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#4b5563' }}>
              Tem certeza que deseja excluir o aluno <strong>{model.nomeAluno}</strong> (RA: {model.codAluno})?
            </p>

            <div className="form-actions">
              <button type="button" className="btn-base btn-secondary" onClick={() => navigate(ROTA.ALUNO.LISTAR)}>
                <MdCancel size={18} /> Cancelar
              </button>
              <button type="submit" className="btn-base btn-primary" style={{ background: '#ef4444' }}>
                <FaTrash size={18} /> Excluir Aluno
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
