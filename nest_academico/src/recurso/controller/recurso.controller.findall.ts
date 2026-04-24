import { Controller, Get, HttpCode, HttpStatus, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks, geraPageLinks } from '../../commons/utils/hateoas.utils';
import { RECURSO } from '../constants/recurso.constants';
import { RecursoResponse } from '../dto/response/recurso.response';
import { RecursoServiceList } from '../service/recurso.service.list';
import { Page } from '../../commons/pagination/page.sistema';
import { PAGINATION } from '../../commons/enum/paginacao.enum';

@ApiTags('Recurso')
@Controller(ROTA.RECURSO.BASE)
export class RecursoControllerFindAll {
  constructor(private readonly recursoServiceList: RecursoServiceList) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.RECURSO.LIST)
  async list(
    @Req() req: Request,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('props') props?: string,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('searchTerm') search?: string,
  ): Promise<Result<Page<RecursoResponse>>> {
    const link = gerarLinks(req, RECURSO.ENTITY);
    const response = await this.recursoServiceList.list(
      page ? Number(page) : PAGINATION.PAGE,
      pageSize ? Number(pageSize) : PAGINATION.PAGESIZE,
      props ? props : RECURSO.FIELDS.NOMERECURSO,
      order ? order : PAGINATION.ASC,
      search,
    );
    const pageLinks = geraPageLinks(req, response, RECURSO.ENTITY);
    if (pageLinks) Object.assign(link, pageLinks);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de recursoes recuperada!',
      response,
      req.path,
      null,
      link,
    );
  }
}
