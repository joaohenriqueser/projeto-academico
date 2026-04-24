import { http } from '../../axios/config.axios';
import { ROTA } from '../../router/url';
import type { Aluno } from '../type/Aluno';

export interface SearchParams {
  page?: number;
  pageSize?: number;
  props?: string;
  order?: string;
  search?: string;
}

export const apiGetAlunos = async (params: SearchParams, url?: string) => {
  const endpoint = url ? url : `/rest${ROTA.ALUNO.LISTAR}`;
  const response = await http.get(endpoint, {
    params,
  });
  return response;
};

export const apiGetAlunoById = async (idAluno: number, url?: string) => {
  const endpoint = url ? `${url}/${idAluno}` : `/rest${ROTA.ALUNO.POR_ID}/${idAluno}`;
  const response = await http.get(endpoint);
  return response;
};

export const apiCreateAluno = async (aluno: Aluno, url?: string) => {
  const endpoint = url ? url : `/rest${ROTA.ALUNO.CRIAR}`;
  const response = await http.post(endpoint, aluno);
  return response;
};

export const apiUpdateAluno = async (idAluno: number, aluno: Aluno, url?: string) => {
  const endpoint = url ? `${url}/${idAluno}` : `/rest${ROTA.ALUNO.ATUALIZAR}/${idAluno}`;
  const response = await http.put(
    endpoint,
    aluno,
  );
  return response;
};

export const apiDeleteAluno = async (idAluno: number, url?: string) => {
  const endpoint = url ? `${url}/${idAluno}` : `/rest${ROTA.ALUNO.EXCLUIR}/${idAluno}`;
  const response = await http.delete(endpoint);
  return response;
};
