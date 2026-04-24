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

export const apiGetAlunos = async (params: SearchParams) => {
  const response = await http.get(`/rest${ROTA.ALUNO.LISTAR}`, {
    params,
  });
  return response;
};

export const apiGetAlunoById = async (idAluno: number) => {
  const response = await http.get(`/rest${ROTA.ALUNO.POR_ID}/${idAluno}`);
  return response;
};

export const apiCreateAluno = async (aluno: Aluno) => {
  const response = await http.post(`/rest${ROTA.ALUNO.CRIAR}`, aluno);
  return response;
};

export const apiUpdateAluno = async (idAluno: number, aluno: Aluno) => {
  const response = await http.put(
    `/rest${ROTA.ALUNO.ATUALIZAR}/${idAluno}`,
    aluno,
  );
  return response;
};

export const apiDeleteAluno = async (idAluno: number) => {
  const response = await http.delete(`/rest${ROTA.ALUNO.EXCLUIR}/${idAluno}`);
  return response;
};
