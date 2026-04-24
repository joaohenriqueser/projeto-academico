import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight, FaPencilAlt, FaTrash, FaSearch, FaCity } from 'react-icons/fa';
import { apiGetCidades } from '../../services/cidade/api/api.cidade';
import { ROTA } from '../../services/router/url';

export default function ListarCidade() {
  const navigate = useNavigate();
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [props, setProps] = useState<string>('nomeCidade');
  const [order, setOrder] = useState<string>('ASC');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchCidades = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        pageSize: pageSize,
        props: props,
        order: order,
        searchTerm: searchTerm === '' ? undefined : searchTerm,
      };
      const response = await apiGetCidades(params);
      if (response.data && response.data.dados) {
        const { content, page, pageSize: resSize, totalElements, totalPages } = response.data.dados;
        setModels(content || []);
        setCurrentPage(page || 1);
        setPageSize(resSize || 5);
        setTotalElements(totalElements || 0);
        setTotalPages(totalPages || 0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchTerm, order, props]);

  useEffect(() => {
    fetchCidades();
  }, [fetchCidades]);

  const onSort = (newProps: string) => {
    const dir = (props === newProps && order === 'ASC') ? 'DESC' : 'ASC';
    setProps(newProps);
    setOrder(dir);
  };

  return (
    <div className="list-container" style={{ paddingTop: '2rem' }}>
      <div className="list-header">
        <h2 className="list-title">
          <FaCity style={{ marginRight: '10px', color: 'var(--brand)' }} />
          Cidades Cadastradas
        </h2>
        <button className="btn-base btn-primary" onClick={() => navigate(ROTA.CIDADE.CRIAR)}>
          <FaPlus size={14} /> Nova Cidade
        </button>
      </div>

      <div className="top-actions">
        <div className="search-box">
          <label>Filtro:</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Digite o nome da cidade..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: '300px' }}
          />
        </div>
        <div className="search-box" style={{ flex: 'none' }}>
          <label>Mostrar:</label>
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
              <th onClick={() => onSort('codCidade')} style={{ cursor: 'pointer' }}>Cód. IBGE {props === 'codCidade' && (order === 'ASC' ? '↑' : '↓')}</th>
              <th onClick={() => onSort('nomeCidade')} style={{ cursor: 'pointer' }}>Nome da Cidade {props === 'nomeCidade' && (order === 'ASC' ? '↑' : '↓')}</th>
              <th style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} style={{ textAlign: "center", padding: "3rem" }}>Carregando dados...</td></tr>
            ) : models.length === 0 ? (
              <tr><td colSpan={3} style={{ textAlign: "center", padding: "3rem" }}>Nenhuma cidade encontrada.</td></tr>
            ) : (
              models.map((m) => (
                <tr key={m.idCidade}>
                  <td><span style={{ color: 'var(--brand)', fontWeight: 700 }}>{m.codCidade}</span></td>
                  <td style={{ fontWeight: 600 }}>{m.nomeCidade}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button className="page-btn" title="Editar" onClick={() => navigate(`${ROTA.CIDADE.ATUALIZAR}/${m.idCidade}`)}><FaPencilAlt size={12} /></button>
                      <button className="page-btn" title="Visualizar" onClick={() => navigate(`${ROTA.CIDADE.POR_ID}/${m.idCidade}`)}><FaSearch size={12} /></button>
                      <button className="page-btn" title="Excluir" style={{ color: '#ef4444' }} onClick={() => navigate(`${ROTA.CIDADE.EXCLUIR}/${m.idCidade}`)}><FaTrash size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination-container">
          <div className="pagination-info">
            Exibindo <b>{models.length}</b> de <b>{totalElements}</b> cidades
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
}
