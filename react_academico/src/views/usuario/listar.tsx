import { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:8000/rest/sistema/usuario/listar");
        setUsuarios(response.data.dados);
      } catch (err) {
        setError("Erro ao carregar usuários.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Usuários</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Nome</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Username</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "10px", textAlign: "left" }}>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.idUsuario}>
              <td style={{ borderBottom: "1px solid #eee", padding: "10px" }}>{usuario.idUsuario}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: "10px" }}>
                {usuario.firstName} {usuario.lastName}
              </td>
              <td style={{ borderBottom: "1px solid #eee", padding: "10px" }}>{usuario.username}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: "10px" }}>{usuario.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {usuarios.length === 0 && <p style={{ marginTop: "10px" }}>Nenhum usuário encontrado.</p>}
    </div>
  );
};

export default ListarUsuario;
