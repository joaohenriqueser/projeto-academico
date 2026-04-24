import { useCallback, useEffect, useState, type ChangeEvent, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { http } from "../../services/axios/config.axios";
import { ROTA } from "../../services/router/url";

interface Usuario {
  idUsuario: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

const ListarUsuario = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [props, setProps] = useState<string>('username');
  const [order, setOrder] = useState<string>('ASC');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        pageSize: pageSize,
        props: props,
        order: order,
        searchTerm: searchTerm === '' ? undefined : searchTerm,
      };

      const response = await http.get(`/rest${ROTA.USUARIO.LISTAR}`, { params });
      
      if (response.data && response.data.dados) {
        const { content, page, pageSize: resPageSize, totalElements, totalPages } = response.data.dados;
        setUsuarios(content || []);
        setCurrentPage(page || 1);
        setPageSize(resPageSize || 5);
        setTotalElements(totalElements || 0);
        setTotalPages(totalPages || 0);
      }
    } catch (err) {
      setError("Erro ao carregar usuários.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, props, order, searchTerm]);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  const onSort = (newProps: string) => {
    const dir = (props === newProps && order === 'ASC') ? 'DESC' : 'ASC';
    setProps(newProps);
    setOrder(dir);
  };

  return (
    <div className="list-container" style={{ paddingTop: '2rem' }}>
      <div className="list-header">
        <h2 className="list-title">Gestão de Usuários</h2>
        <button className="btn-base btn-primary" onClick={() => navigate(ROTA.USUARIO.CRIAR)}>
          <FaPlus size={14} /> Novo Usuário
        </button>
      </div>

      <div className="top-actions">
        <div className="search-box">
          <label>Pesquisar:</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Digite para buscar..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: '300px' }}
          />
        </div>
        <div className="search-box" style={{ flex: 'none' }}>
          <label>Exibir:</label>
          <select 
            className="input-field" 
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            style={{ width: '80px', padding: '0.5rem' }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => onSort('idUsuario')} style={{ cursor: 'pointer' }}>ID {props === 'idUsuario' && (order === 'ASC' ? '↑' : '↓')}</th>
              <th onClick={() => onSort('firstName')} style={{ cursor: 'pointer' }}>Nome Completo {props === 'firstName' && (order === 'ASC' ? '↑' : '↓')}</th>
              <th onClick={() => onSort('username')} style={{ cursor: 'pointer' }}>Username {props === 'username' && (order === 'ASC' ? '↑' : '↓')}</th>
              <th onClick={() => onSort('email')} style={{ cursor: 'pointer' }}>E-mail {props === 'email' && (order === 'ASC' ? '↑' : '↓')}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} style={{ textAlign: "center", padding: "3rem" }}>Carregando dados...</td></tr>
            ) : usuarios.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: "center", padding: "3rem" }}>Nenhum registro encontrado.</td></tr>
            ) : (
              usuarios.map((u) => (
                <tr key={u.idUsuario}>
                  <td>#{u.idUsuario}</td>
                  <td style={{ fontWeight: 600 }}>{u.firstName} {u.lastName}</td>
                  <td>@{u.username}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{u.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination-container">
          <div className="pagination-info">
            Mostrando <b>{usuarios.length}</b> de <b>{totalElements}</b> registros
          </div>
          <div className="pagination-buttons">
            <button className="page-btn" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}><FaAngleDoubleLeft /></button>
            <button className="page-btn" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}><FaChevronLeft /></button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i + 1} 
                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button className="page-btn" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}><FaChevronRight /></button>
            <button className="page-btn" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}><FaAngleDoubleRight /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListarUsuario;
