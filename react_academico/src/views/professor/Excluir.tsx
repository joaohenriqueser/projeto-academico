import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTrash, FaChalkboardTeacher } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { toast } from 'react-toastify';
import { apiDeleteProfessor, apiGetProfessorById } from '../../services/professor/api/api.professor';
import { PROFESSOR } from '../../services/professor/constants/professor.constants';
import type { Professor } from '../../services/professor/type/Professor';
import { ROTA } from '../../services/router/url';

export default function ExcluirProfessor() {
  const { idProfessor } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<Professor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (idProfessor) {
        try {
          setLoading(true);
          const res = await apiGetProfessorById(Number(idProfessor));
          if (res.data && res.data.dados) {
            setModel(res.data.dados);
          }
        } catch (error) {
          console.error(error);
          toast.error("Erro ao carregar dados do professor.");
        } finally {
          setLoading(false);
        }
      }
    }
    loadData();
  }, [idProfessor]);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (idProfessor) {
      try {
        await apiDeleteProfessor(Number(idProfessor));
        toast.success("Professor excluído com sucesso!");
        navigate(ROTA.PROFESSOR.LISTAR);
      } catch (error: any) {
        console.error(error);
        const msg = error.response?.data?.mensagem || error.response?.data?.message || "Erro ao excluir professor.";
        toast.error(msg);
      }
    }
  };

  if (loading) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: "center", padding: "3rem" }}>
          Carregando dados do professor...
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: "center", padding: "3rem" }}>
          <p>Professor não encontrado.</p>
          <button className="btn-base btn-secondary" onClick={() => navigate(ROTA.PROFESSOR.LISTAR)}>
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
            <FaChalkboardTeacher /> 
            {PROFESSOR.TITULO.EXCLUIR}
          </h2>
          
          <form onSubmit={handleDelete}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#4b5563' }}>
              Tem certeza que deseja excluir o professor <strong>{model.nomeProfessor}</strong> (Código: {model.codProfessor})?
            </p>

            <div className="form-actions">
              <button type="button" className="btn-base btn-secondary" onClick={() => navigate(ROTA.PROFESSOR.LISTAR)}>
                <MdCancel size={18} /> Cancelar
              </button>
              <button type="submit" className="btn-base btn-primary" style={{ background: '#ef4444' }}>
                <FaTrash size={18} /> Excluir Professor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
