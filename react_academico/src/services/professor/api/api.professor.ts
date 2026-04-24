import { http } from '../../axios/config.axios';
import { ROTA } from '../../router/url';
import type { Professor } from '../type/Professor';

export interface SearchParams {
  page?: number;
  pageSize?: number;
  props?: string;
  order?: string;
  search?: string;
}

export const apiGetProfessores = async (params: SearchParams, url?: string) => {
  const endpoint = url ? url : `/rest${ROTA.PROFESSOR.LISTAR}`;
  const response = await http.get(endpoint, {
    params,
  });
  return response;
};

export const apiGetProfessorById = async (idProfessor: number, url?: string) => {
  const endpoint = url ? `${url}/${idProfessor}` : `/rest${ROTA.PROFESSOR.POR_ID}/${idProfessor}`;
  const response = await http.get(endpoint);
  return response;
};

export const apiCreateProfessor = async (professor: Professor, url?: string) => {
  const endpoint = url ? url : `/rest${ROTA.PROFESSOR.CRIAR}`;
  const response = await http.post(endpoint, professor);
  return response;
};

export const apiUpdateProfessor = async (idProfessor: number, professor: Professor, url?: string) => {
  const endpoint = url ? `${url}/${idProfessor}` : `/rest${ROTA.PROFESSOR.ATUALIZAR}/${idProfessor}`;
  const response = await http.put(
    endpoint,
    professor,
  );
  return response;
};

export const apiDeleteProfessor = async (idProfessor: number, url?: string) => {
  const endpoint = url ? `${url}/${idProfessor}` : `/rest${ROTA.PROFESSOR.EXCLUIR}/${idProfessor}`;
  const response = await http.delete(endpoint);
  return response;
};
