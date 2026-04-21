import { useCallback, useEffect, useState, type ChangeEvent, type MouseEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import PaginationFooter from "../../components/pagination/PaginationFooter";

interface Usuario {
  idUsuario: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

const ListarUsuario = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [props, setProps] = useState<string>('firstName');
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
        searchTerm: searchTerm === '' ? null : searchTerm,
      };

      const response = await axios.get("http://localhost:8000/rest/sistema/usuario/listar", { params });
      
      const { content, page, pageSize: resPageSize, totalElements, totalPages } = response.data.dados;
      
      setUsuarios(content || []);
      setCurrentPage(page);
      setPageSize(resPageSize);
      setTotalElements(totalElements);
      setTotalPages(totalPages);
    } catch (err) {
      setError("Erro ao carregar usuários.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, props, order, searchTerm]);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(Number(pageNumber));
  };

  const handleRecordsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const onSortProps = (e: MouseEvent<HTMLButtonElement>, newProps: string) => {
    e.preventDefault();
    const dir = (props === newProps && order === 'ASC') ? 'DESC' : 'ASC';
    setProps(newProps);
    setOrder(dir);
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Lista de Usuários</h2>
        <Link to="/sistema/usuario/criar" className="btn btn-add">
          <span className="btn-icon">
            <i><FaPlus /></i>
          </span>
          Novo
        </Link>
      </div>

      <div style={{ marginBottom: "15px", marginTop: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
        <input 
          type="text" 
          placeholder="Buscar..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <select onChange={handleRecordsPerPageChange} value={pageSize} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}>
          <option value="5">5 registros por página</option>
          <option value="10">10 registros por página</option>
          <option value="20">20 registros por página</option>
        </select>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "10px", textAlign: "left" }}>
              <button onClick={(e) => onSortProps(e, 'idUsuario')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>ID</button>
            </th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "10px", textAlign: "left" }}>
              <button onClick={(e) => onSortProps(e, 'firstName')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Nome</button>
            </th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "10px", textAlign: "left" }}>
              <button onClick={(e) => onSortProps(e, 'username')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Username</button>
            </th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "10px", textAlign: "left" }}>
              <button onClick={(e) => onSortProps(e, 'email')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>E-mail</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
             <tr><td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>Carregando usuários...</td></tr>
          ) : usuarios.length === 0 ? (
             <tr><td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>Nenhum usuário encontrado.</td></tr>
          ) : (
            usuarios.map((usuario) => (
              <tr key={usuario.idUsuario}>
                <td style={{ borderBottom: "1px solid #eee", padding: "10px" }}>{usuario.idUsuario}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: "10px" }}>
                  {usuario.firstName} {usuario.lastName}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "10px" }}>{usuario.username}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: "10px" }}>{usuario.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {!loading && (
         <div style={{ marginTop: "20px" }}>
           <PaginationFooter
             currentPage={currentPage}
             pageSize={pageSize}
             totalElements={totalElements}
             totalPages={totalPages}
             onPageChange={handlePageChange}
           />
         </div>
      )}
    </div>
  );
};

export default ListarUsuario;
