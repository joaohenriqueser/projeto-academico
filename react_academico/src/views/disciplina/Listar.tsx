import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight, FaPencilAlt, FaTrash, FaSearch, FaBook } from 'react-icons/fa';
import { apiGetDisciplinas } from '../../services/disciplina/api/api.disciplina';
import { ROTA } from '../../services/router/url';

export default function ListarDisciplina() {
  const navigate = useNavigate();
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [props, setProps] = useState<string>('nomeDisciplina');
  const [order, setOrder] = useState<string>('ASC');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchDisciplinas = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        pageSize: pageSize,
        props: props,
        order: order,
        searchTerm: searchTerm === '' ? undefined : searchTerm,
      };
      const response = await apiGetDisciplinas(params);
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
    fetchDisciplinas();
  }, [fetchDisciplinas]);

  const onSort = (newProps: string) => {
    const dir = (props === newProps && order === 'ASC') ? 'DESC' : 'ASC';
    setProps(newProps);
    setOrder(dir);
  };

  return (
    <div className="list-container" style={{ paddingTop: '2rem' }}>
      <div className="list-header">
        <h2 className="list-title">
          <FaBook style={{ marginRight: '10px', color: 'var(--brand)' }} />
          Catálogo de Disciplinas
        </h2>
        <button className="btn-base btn-primary" onClick={() => navigate(ROTA.DISCIPLINA.CRIAR)}>
          <FaPlus size={14} /> Nova Disciplina
        </button>
      </div>

      <div className="top-actions">
        <div className="search-box">
          <label>Pesquisar:</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Nome da disciplina..." 
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
              <th onClick={() => onSort('periodo')} style={{ cursor: 'pointer' }}>Período {props === 'periodo' && (order === 'ASC' ? '↑' : '↓')}</th>
              <th onClick={() => onSort('nomeDisciplina')} style={{ cursor: 'pointer' }}>Nome da Disciplina {props === 'nomeDisciplina' && (order === 'ASC' ? '↑' : '↓')}</th>
              <th style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} style={{ textAlign: "center", padding: "3rem" }}>Carregando dados...</td></tr>
            ) : models.length === 0 ? (
              <tr><td colSpan={3} style={{ textAlign: "center", padding: "3rem" }}>Nenhuma disciplina encontrada.</td></tr>
            ) : (
              models.map((m) => (
                <tr key={m.idDisciplina}>
                  <td><span style={{ background: '#eff6ff', color: '#1e40af', padding: '4px 12px', borderRadius: '20px', fontWeight: 800, fontSize: '0.8rem' }}>{m.periodo}º Período</span></td>
                  <td style={{ fontWeight: 600 }}>{m.nomeDisciplina}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button className="page-btn" title="Editar" onClick={() => navigate(`${ROTA.DISCIPLINA.ATUALIZAR}/${m.idDisciplina}`)}><FaPencilAlt size={12} /></button>
                      <button className="page-btn" title="Visualizar" onClick={() => navigate(`${ROTA.DISCIPLINA.POR_ID}/${m.idDisciplina}`)}><FaSearch size={12} /></button>
                      <button className="page-btn" title="Excluir" style={{ color: '#ef4444' }} onClick={() => navigate(`${ROTA.DISCIPLINA.EXCLUIR}/${m.idDisciplina}`)}><FaTrash size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination-container">
          <div className="pagination-info">
            Mostrando <b>{models.length}</b> de <b>{totalElements}</b> disciplinas
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
