import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTrash, FaBook } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { toast } from 'react-toastify';
import { apiDeleteDisciplina, apiGetDisciplinaById } from '../../services/disciplina/api/api.disciplina';
import { DISCIPLINA } from '../../services/disciplina/constants/disciplina.constants';
import type { Disciplina } from '../../services/disciplina/type/Disciplina';
import { ROTA } from '../../services/router/url';

export default function ExcluirDisciplina() {
  const { idDisciplina } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<Disciplina | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (idDisciplina) {
        try {
          setLoading(true);
          const res = await apiGetDisciplinaById(Number(idDisciplina));
          if (res.data && res.data.dados) {
            setModel(res.data.dados);
          }
        } catch (error) {
          console.error(error);
          toast.error("Erro ao carregar dados da disciplina.");
        } finally {
          setLoading(false);
        }
      }
    }
    loadData();
  }, [idDisciplina]);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (idDisciplina) {
      try {
        await apiDeleteDisciplina(Number(idDisciplina));
        toast.success("Disciplina excluída com sucesso!");
        navigate(ROTA.DISCIPLINA.LISTAR);
      } catch (error: any) {
        console.error(error);
        const msg = error.response?.data?.mensagem || error.response?.data?.message || "Erro ao excluir disciplina.";
        toast.error(msg);
      }
    }
  };

  if (loading) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: "center", padding: "3rem" }}>
          Carregando dados da disciplina...
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: "center", padding: "3rem" }}>
          <p>Disciplina não encontrada.</p>
          <button className="btn-base btn-secondary" onClick={() => navigate(ROTA.DISCIPLINA.LISTAR)}>
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
            <FaBook /> 
            {DISCIPLINA.TITULO.EXCLUIR}
          </h2>
          
          <form onSubmit={handleDelete}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#4b5563' }}>
              Tem certeza que deseja excluir a disciplina <strong>{model.nomeDisciplina}</strong> (Período: {model.periodo})?
            </p>

            <div className="form-actions">
              <button type="button" className="btn-base btn-secondary" onClick={() => navigate(ROTA.DISCIPLINA.LISTAR)}>
                <MdCancel size={18} /> Cancelar
              </button>
              <button type="submit" className="btn-base btn-primary" style={{ background: '#ef4444' }}>
                <FaTrash size={18} /> Excluir Disciplina
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
