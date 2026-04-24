import type { RouteObject } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Dashboard from "../../views/Dashboard";

import AlterarCidade from "../../views/cidade/Alterar";
import ConsultarCidade from "../../views/cidade/Consultar";
import CriarCidade from "../../views/cidade/Criar";
import ExcluirCidade from "../../views/cidade/Excluir";
import ListarCidade from "../../views/cidade/Listar";

import AlterarAluno from "../../views/aluno/Alterar";
import ConsultarAluno from "../../views/aluno/Consultar";
import CriarAluno from "../../views/aluno/Criar";
import ExcluirAluno from "../../views/aluno/Excluir";
import ListarAluno from "../../views/aluno/Listar";

import AlterarProfessor from "../../views/professor/Alterar";
import ConsultarProfessor from "../../views/professor/Consultar";
import CriarProfessor from "../../views/professor/Criar";
import ExcluirProfessor from "../../views/professor/Excluir";
import ListarProfessor from "../../views/professor/Listar";

import AlterarDisciplina from "../../views/disciplina/Alterar";
import ConsultarDisciplina from "../../views/disciplina/Consultar";
import CriarDisciplina from "../../views/disciplina/Criar";
import ExcluirDisciplina from "../../views/disciplina/Excluir";
import ListarDisciplina from "../../views/disciplina/Listar";

import AlterarAvaliacao from "../../views/avaliacao/Alterar";
import ConsultarAvaliacao from "../../views/avaliacao/Consultar";
import CriarAvaliacao from "../../views/avaliacao/Criar";
import ExcluirAvaliacao from "../../views/avaliacao/Excluir";
import ListarAvaliacao from "../../views/avaliacao/Listar";

import ListarUsuario from "../../views/usuario/listar";
import CriarUsuario from "../../views/usuario/register";

import { ROTA } from "./url";

export const routes: RouteObject[] = [
  {
    path: "/sistema",
    element: <Layout />, // componente (pai)
    children: [
      {
        path: "/sistema/dashboard", //url
        element: <Dashboard />, //componente a ser carregado (filho)
      },
      { path: ROTA.CIDADE.LISTAR, element: <ListarCidade /> },
      { path: ROTA.CIDADE.CRIAR, element: <CriarCidade /> },
      { path: `${ROTA.CIDADE.ATUALIZAR}/:idCidade`, element: <AlterarCidade /> },
      { path: `${ROTA.CIDADE.EXCLUIR}/:idCidade`, element: <ExcluirCidade /> },
      { path: `${ROTA.CIDADE.POR_ID}/:idCidade`, element: <ConsultarCidade /> },

      { path: ROTA.ALUNO.LISTAR, element: <ListarAluno /> },
      { path: ROTA.ALUNO.CRIAR, element: <CriarAluno /> },
      { path: `${ROTA.ALUNO.ATUALIZAR}/:idAluno`, element: <AlterarAluno /> },
      { path: `${ROTA.ALUNO.EXCLUIR}/:idAluno`, element: <ExcluirAluno /> },
      { path: `${ROTA.ALUNO.POR_ID}/:idAluno`, element: <ConsultarAluno /> },

      { path: ROTA.PROFESSOR.LISTAR, element: <ListarProfessor /> },
      { path: ROTA.PROFESSOR.CRIAR, element: <CriarProfessor /> },
      { path: `${ROTA.PROFESSOR.ATUALIZAR}/:idProfessor`, element: <AlterarProfessor /> },
      { path: `${ROTA.PROFESSOR.EXCLUIR}/:idProfessor`, element: <ExcluirProfessor /> },
      { path: `${ROTA.PROFESSOR.POR_ID}/:idProfessor`, element: <ConsultarProfessor /> },

      { path: ROTA.DISCIPLINA.LISTAR, element: <ListarDisciplina /> },
      { path: ROTA.DISCIPLINA.CRIAR, element: <CriarDisciplina /> },
      { path: `${ROTA.DISCIPLINA.ATUALIZAR}/:idDisciplina`, element: <AlterarDisciplina /> },
      { path: `${ROTA.DISCIPLINA.EXCLUIR}/:idDisciplina`, element: <ExcluirDisciplina /> },
      { path: `${ROTA.DISCIPLINA.POR_ID}/:idDisciplina`, element: <ConsultarDisciplina /> },

      { path: ROTA.AVALIACAO.LISTAR, element: <ListarAvaliacao /> },
      { path: ROTA.AVALIACAO.CRIAR, element: <CriarAvaliacao /> },
      { path: `${ROTA.AVALIACAO.ATUALIZAR}/:idAvaliacao`, element: <AlterarAvaliacao /> },
      { path: `${ROTA.AVALIACAO.EXCLUIR}/:idAvaliacao`, element: <ExcluirAvaliacao /> },
      { path: `${ROTA.AVALIACAO.POR_ID}/:idAvaliacao`, element: <ConsultarAvaliacao /> },

      { path: ROTA.USUARIO.LISTAR, element: <ListarUsuario /> },
      { path: ROTA.USUARIO.CRIAR, element: <CriarUsuario /> },
    ],
  },
];
