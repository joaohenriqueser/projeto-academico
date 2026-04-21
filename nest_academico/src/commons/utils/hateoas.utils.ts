import { Request } from 'express';
import { ROTA_SISTEMA } from '../constants/url.sistema';
import { Link } from '../mensagem/mensagem';
import { Page } from '../pagination/page.sistema';

//localhost

export function gerarLinks(
  req: Request,
  entity: string,
  id?: number,
): Record<string, Link> {
  const protocol = req.protocol;
  const host = req.get('host');

  //http://localhost:8000/rest/sistema/cidade/
  const baseUrl = `${protocol}://${host}/${ROTA_SISTEMA}/${entity.toLowerCase()}`;

  const link: Record<string, Link> = {
    listar: {
      href: `${baseUrl}/listar`,
      method: 'GET',
    },
    criar: {
      href: `${baseUrl}/criar`,
      method: 'POST',
    },
  };

  if (id) {
    link.buscar = {
      href: `${baseUrl}/buscar/${id}`,
      method: 'GET',
    };
    link.alterar = {
      href: `${baseUrl}/alterar/${id}`,
      method: 'PUT',
    };
    link.excluir = {
      href: `${baseUrl}/excluir/${id}`,
      method: 'PUT',
    };
  }

  return link;
}

export function geraPageLinks(
  req: Request,
  page: Page<any>,
  entity: string,
): Record<string, Link> | null {
  const protocol = req.protocol;
  const host = req.get('host');
  const baseUrl = `${protocol}://${host}/${ROTA_SISTEMA}/${entity.toLowerCase()}`;

  const pageSize = page.pageSize;
  const currentPage = page.page;
  const totalPages = page.totalPages;

  if (totalPages <= 1) {
    return null;
  }

  const pageLinks: Record<string, Link> = {};

  pageLinks.first = {
    href: `${baseUrl}/listar?page=1&pageSize=${pageSize}`,
    method: 'GET',
  };

  if (currentPage > 1) {
    pageLinks.prev = {
      href: `${baseUrl}/listar?page=${currentPage - 1}&pageSize=${pageSize}`,
      method: 'GET',
    };
  }

  if (currentPage < totalPages) {
    pageLinks.next = {
      href: `${baseUrl}/listar?page=${currentPage + 1}&pageSize=${pageSize}`,
      method: 'GET',
    };
  }

  pageLinks.last = {
    href: `${baseUrl}/listar?page=${totalPages}&pageSize=${pageSize}`,
    method: 'GET',
  };

  return pageLinks;
}
