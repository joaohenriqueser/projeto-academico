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

export const apiGetDisciplinas = async (params: SearchParams, url?: string) => {
  const endpoint = url ? url : `/rest${ROTA.DISCIPLINA.LISTAR}`;
  const response = await http.get(endpoint, {
    params,
  });
  return response;
};

export const apiGetDisciplinaById = async (idDisciplina: number, url?: string) => {
  const endpoint = url ? `${url}/${idDisciplina}` : `/rest${ROTA.DISCIPLINA.POR_ID}/${idDisciplina}`;
  const response = await http.get(endpoint);
  return response;
};

export const apiCreateDisciplina = async (disciplina: Disciplina, url?: string) => {
  const endpoint = url ? url : `/rest${ROTA.DISCIPLINA.CRIAR}`;
  const response = await http.post(endpoint, disciplina);
  return response;
};

export const apiUpdateDisciplina = async (idDisciplina: number, disciplina: Disciplina, url?: string) => {
  const endpoint = url ? `${url}/${idDisciplina}` : `/rest${ROTA.DISCIPLINA.ATUALIZAR}/${idDisciplina}`;
  const response = await http.put(
    endpoint,
    disciplina,
  );
  return response;
};

export const apiDeleteDisciplina = async (idDisciplina: number, url?: string) => {
  const endpoint = url ? `${url}/${idDisciplina}` : `/rest${ROTA.DISCIPLINA.EXCLUIR}/${idDisciplina}`;
  const response = await http.delete(endpoint);
  return response;
};
