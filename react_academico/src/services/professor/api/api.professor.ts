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

export const apiGetProfessores = async (params: SearchParams) => {
  const response = await http.get(`/rest${ROTA.PROFESSOR.LISTAR}`, {
    params,
  });
  return response;
};

export const apiGetProfessorById = async (idProfessor: number) => {
  const response = await http.get(`/rest${ROTA.PROFESSOR.POR_ID}/${idProfessor}`);
  return response;
};

export const apiCreateProfessor = async (professor: Professor) => {
  const response = await http.post(`/rest${ROTA.PROFESSOR.CRIAR}`, professor);
  return response;
};

export const apiUpdateProfessor = async (idProfessor: number, professor: Professor) => {
  const response = await http.put(
    `/rest${ROTA.PROFESSOR.ATUALIZAR}/${idProfessor}`,
    professor,
  );
  return response;
};

export const apiDeleteProfessor = async (idProfessor: number) => {
  const response = await http.delete(`/rest${ROTA.PROFESSOR.EXCLUIR}/${idProfessor}`);
  return response;
};
