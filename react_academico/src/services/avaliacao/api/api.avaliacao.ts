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

export const apiGetAvaliacaoes = async (params: SearchParams, url?: string) => {
  const endpoint = url ? url : `/rest${ROTA.AVALIACAO.LISTAR}`;
  const response = await http.get(endpoint, {
    params,
  });
  return response;
};

export const apiGetAvaliacaoById = async (idAvaliacao: number, url?: string) => {
  const endpoint = url ? `${url}/${idAvaliacao}` : `/rest${ROTA.AVALIACAO.POR_ID}/${idAvaliacao}`;
  const response = await http.get(endpoint);
  return response;
};

export const apiCreateAvaliacao = async (avaliacao: Avaliacao, url?: string) => {
  const endpoint = url ? url : `/rest${ROTA.AVALIACAO.CRIAR}`;
  const response = await http.post(endpoint, avaliacao);
  return response;
};

export const apiUpdateAvaliacao = async (idAvaliacao: number, avaliacao: Avaliacao, url?: string) => {
  const endpoint = url ? `${url}/${idAvaliacao}` : `/rest${ROTA.AVALIACAO.ATUALIZAR}/${idAvaliacao}`;
  const response = await http.put(
    endpoint,
    avaliacao,
  );
  return response;
};

export const apiDeleteAvaliacao = async (idAvaliacao: number, url?: string) => {
  const endpoint = url ? `${url}/${idAvaliacao}` : `/rest${ROTA.AVALIACAO.EXCLUIR}/${idAvaliacao}`;
  const response = await http.delete(endpoint);
  return response;
};
