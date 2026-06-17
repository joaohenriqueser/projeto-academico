import { useEffect, useState } from "react";
import { FaTrash, FaCity } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  apiDeleteCidade,
  apiGetCidade,
} from "../../services/cidade/api/api.cidade";
import type { Cidade } from "../../services/cidade/type/Cidade";
import { ROTA } from "../../services/router/url";

export default function ExcluirCidade() {
  const { idCidade } = useParams<{ idCidade: string }>();
  const navigate = useNavigate();
  const [model, setModel] = useState<Cidade | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!idCidade) return;
      try {
        setLoading(true);
        const res = await apiGetCidade(idCidade);
        if (res.data && res.data.dados) {
          setModel(res.data.dados);
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar dados da cidade.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [idCidade]);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCidade) return;

    try {
      await apiDeleteCidade(idCidade);
      toast.success("Cidade excluída com sucesso!");
      navigate(ROTA.CIDADE.LISTAR);
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.mensagem || error.response?.data?.message || "Erro ao excluir cidade.";
      toast.error(msg);
    }
  };

  if (loading) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: "center", padding: "3rem" }}>
          Carregando dados da cidade...
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="main-wrapper">
        <div className="modern-card" style={{ textAlign: "center", padding: "3rem" }}>
          <p>Cidade não encontrada.</p>
          <button className="btn-base btn-secondary" onClick={() => navigate(ROTA.CIDADE.LISTAR)}>
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
            <FaCity /> 
            Excluir Cidade
          </h2>
          
          <form onSubmit={handleDelete}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#4b5563' }}>
              Tem certeza que deseja excluir a cidade <strong>{model.nomeCidade}</strong> (Código IBGE: {model.codCidade})?
            </p>

            <div className="form-actions">
              <button type="button" className="btn-base btn-secondary" onClick={() => navigate(ROTA.CIDADE.LISTAR)}>
                <MdCancel size={18} /> Cancelar
              </button>
              <button type="submit" className="btn-base btn-primary" style={{ background: '#ef4444' }}>
                <FaTrash size={18} /> Excluir Cidade
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
