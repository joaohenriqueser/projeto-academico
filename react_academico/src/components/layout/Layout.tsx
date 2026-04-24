import { Link, Outlet } from "react-router-dom";
import "./layout.css";

export default function Layout() {
  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/sistema/dashboard">Dashboard</Link>
        <Link to="/sistema/cidade/listar">Cidade</Link>
        <Link to="/sistema/usuario/listar">Usuários</Link>
        <Link to="/sistema/professor/listar">Professores</Link>
        <Link to="/sistema/aluno/listar">Alunos</Link>
        <Link to="/sistema/disciplina/listar">Disciplinas</Link>
        <Link to="/sistema/avaliacao/listar">Avaliações</Link>
      </aside>
      <div className="content">
        <header>
          <div className="system-title">
            <b>Sistema Acadêmico</b>
          </div>
          <div className="user-info">
            <span className="username">
              <b>Francisco</b>
            </span>
            <a href="#" className="btn btn-logout">
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
