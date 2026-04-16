import type { RouteObject } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Dashboard from "../../views/Dashboard";
import AlterarCidade from "../../views/cidade/Alterar";
import ConsultarCidade from "../../views/cidade/Consultar";
import CriarCidade from "../../views/cidade/Criar";
import ExcluirCidade from "../../views/cidade/Excluir";
import ListarCidade from "../../views/cidade/Listar";
import RegisterUsuario from "../../views/usuario/register";
import ListarUsuario from "../../views/usuario/listar";
import { ROTA } from "./url";

export const routes: RouteObject[] = [
  {
    path: "/sistema",
    element: <Layout />,
    children: [
      {
        path: "/sistema/dashboard", //url
        element: <Dashboard />, //componente a ser carregado (filho)
      },
      {
        path: ROTA.CIDADE.LISTAR,
        element: <ListarCidade />,
      },
      {
        path: ROTA.CIDADE.CRIAR,
        element: <CriarCidade />,
      },
      {
        path: `${ROTA.CIDADE.ATUALIZAR}/:idCidade`,
        element: <AlterarCidade />,
      },
      {
        path: `${ROTA.CIDADE.EXCLUIR}/:idCidade`,
        element: <ExcluirCidade />,
      },
      {
        path: `${ROTA.CIDADE.POR_ID}/:idCidade`,
        element: <ConsultarCidade />,
      },
      {
        path: ROTA.USUARIO.CRIAR,
        element: <RegisterUsuario />,
      },
      {
        path: ROTA.USUARIO.LISTAR,
        element: <ListarUsuario />,
      },
    ],
  },
];
