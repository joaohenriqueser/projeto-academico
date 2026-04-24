import { http } from '../../axios/config.axios';
import { ROTA } from '../../router/url';
import type { Disciplina } from '../type/Disciplina';

export interface SearchParams {
  page?: number;
  pageSize?: number;
  props?: string;
  order?: string;
  search?: string;
}

export const apiGetDisciplinas = async (params: SearchParams) => {
  const response = await http.get(`/rest${ROTA.DISCIPLINA.LISTAR}`, {
    params,
  });
  return response;
};

export const apiGetDisciplinaById = async (idDisciplina: number) => {
  const response = await http.get(`/rest${ROTA.DISCIPLINA.POR_ID}/${idDisciplina}`);
  return response;
};

export const apiCreateDisciplina = async (disciplina: Disciplina) => {
  const response = await http.post(`/rest${ROTA.DISCIPLINA.CRIAR}`, disciplina);
  return response;
};

export const apiUpdateDisciplina = async (idDisciplina: number, disciplina: Disciplina) => {
  const response = await http.put(
    `/rest${ROTA.DISCIPLINA.ATUALIZAR}/${idDisciplina}`,
    disciplina,
  );
  return response;
};

export const apiDeleteDisciplina = async (idDisciplina: number) => {
  const response = await http.delete(`/rest${ROTA.DISCIPLINA.EXCLUIR}/${idDisciplina}`);
  return response;
};
