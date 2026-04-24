import { http } from '../../axios/config.axios';
import { ROTA } from '../../router/url';
import type { Avaliacao } from '../type/Avaliacao';

export interface SearchParams {
  page?: number;
  pageSize?: number;
  props?: string;
  order?: string;
  search?: string;
}

export const apiGetAvaliacaoes = async (params: SearchParams) => {
  const response = await http.get(`/rest${ROTA.AVALIACAO.LISTAR}`, {
    params,
  });
  return response;
};

export const apiGetAvaliacaoById = async (idAvaliacao: number) => {
  const response = await http.get(`/rest${ROTA.AVALIACAO.POR_ID}/${idAvaliacao}`);
  return response;
};

export const apiCreateAvaliacao = async (avaliacao: Avaliacao) => {
  const response = await http.post(`/rest${ROTA.AVALIACAO.CRIAR}`, avaliacao);
  return response;
};

export const apiUpdateAvaliacao = async (idAvaliacao: number, avaliacao: Avaliacao) => {
  const response = await http.put(
    `/rest${ROTA.AVALIACAO.ATUALIZAR}/${idAvaliacao}`,
    avaliacao,
  );
  return response;
};

export const apiDeleteAvaliacao = async (idAvaliacao: number) => {
  const response = await http.delete(`/rest${ROTA.AVALIACAO.EXCLUIR}/${idAvaliacao}`);
  return response;
};
