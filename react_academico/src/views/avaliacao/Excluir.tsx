import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTrash, FaStar } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { toast } from 'react-toastify';
import { apiDeleteAvaliacao, apiGetAvaliacaoById } from '../../services/avaliacao/api/api.avaliacao';
import { AVALIACAO } from '../../services/avaliacao/constants/avaliacao.constants';
import type { Avaliacao } from '../../services/avaliacao/type/Avaliacao';
import { ROTA } from '../../services/router/url';

export default function ExcluirAvaliacao() {
  const { idAvaliacao } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<Avaliacao | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (idAvaliacao) {
        try {
          setLoading(true);
          const res = await apiGetAvaliacaoById(Number(idAvaliacao));
          if (res.data && res.data.dados) {
            setModel(res.data.dados);
          }
        } catch (error) {
          console.error(error);
          toast.error("Erro ao carregar dados da avaliação.");
        } finally {
          setLoading(false);
        }
      }
    }
    loadData();
  }, [idAvaliacao]);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (idAvaliacao) {
      try {
        await apiDeleteAvaliacao(Number(idAvaliacao));
        toast.success("Avaliação excluída com sucesso!");
        navigate(ROTA.AVALIACAO.LISTAR);
      } catch (error: any) {
        console.error(error);
        const msg = error.response?.data?.mensagem || error.response?.data?.message || "Erro ao excluir avaliação.";
        toast.error(msg);
      }
    }
  };

  if (loading) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: "center", padding: "3rem" }}>
          Carregando dados da avaliação...
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: "center", padding: "3rem" }}>
          <p>Avaliação não encontrada.</p>
          <button className="btn-base btn-secondary" onClick={() => navigate(ROTA.AVALIACAO.LISTAR)}>
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
            <FaStar /> 
            {AVALIACAO.TITULO.EXCLUIR}
          </h2>
          
          <form onSubmit={handleDelete}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#4b5563' }}>
              Tem certeza que deseja excluir a avaliação <strong>{model.descricao}</strong> (ID: {model.idAvaliacao})?
            </p>

            <div className="form-actions">
              <button type="button" className="btn-base btn-secondary" onClick={() => navigate(ROTA.AVALIACAO.LISTAR)}>
                <MdCancel size={18} /> Cancelar
              </button>
              <button type="submit" className="btn-base btn-primary" style={{ background: '#ef4444' }}>
                <FaTrash size={18} /> Excluir Avaliação
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
