import { http } from '../../axios/config.axios';
import { ROTA } from '../../router/url';
import type { Cidade } from '../type/Cidade';

export interface SearchParams {
  page?: number;
  pageSize?: number;
  props?: string;
  order?: string;
  search?: string;
}

export const apiGetCidades = async (params: SearchParams, url?: string) => {
  const endpoint = url ? url : `/rest${ROTA.CIDADE.LISTAR}`;
  const response = await http.get(endpoint, {
    params,
  });
  return response;
};

export const apiGetCidade = async (idCidade: string, url?: string) => {
  const endpoint = url ? `${url}/${idCidade}` : `/rest${ROTA.CIDADE.POR_ID}/${idCidade}`;
  const response = await http.get(endpoint);
  return response;
};

export const apiPostCidade = async (cidade: Cidade, url?: string) => {
  const endpoint = url ? url : `/rest${ROTA.CIDADE.CRIAR}`;
  const response = await http.post(endpoint, cidade);
  return response;
};

export const apiPutCidade = async (idCidade: string, cidade: Cidade, url?: string) => {
  const endpoint = url ? `${url}/${idCidade}` : `/rest${ROTA.CIDADE.ATUALIZAR}/${idCidade}`;
  const response = await http.put(
    endpoint,
    cidade,
  );
  return response;
};

export const apiDeleteCidade = async (idCidade: string, url?: string) => {
  const endpoint = url ? `${url}/${idCidade}` : `/rest${ROTA.CIDADE.EXCLUIR}/${idCidade}`;
  const response = await http.delete(endpoint);
  return response;
};
