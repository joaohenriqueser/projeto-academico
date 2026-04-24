import { Controller, Get, HttpCode, HttpStatus, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks, geraPageLinks } from '../../commons/utils/hateoas.utils';
import { AVALIACAO } from '../constants/avaliacao.constants';
import { AvaliacaoResponse } from '../dto/response/avaliacao.response';
import { AvaliacaoServiceList } from '../service/avaliacao.service.list';
import { Page } from '../../commons/pagination/page.sistema';
import { PAGINATION } from '../../commons/enum/paginacao.enum';

@ApiTags('Avaliacao')
@Controller(ROTA.AVALIACAO.BASE)
export class AvaliacaoControllerFindAll {
  constructor(private readonly avaliacaoServiceList: AvaliacaoServiceList) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.AVALIACAO.LIST)
  async list(
    @Req() req: Request,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('props') props?: string,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('searchTerm') search?: string,
  ): Promise<Result<Page<AvaliacaoResponse>>> {
    const link = gerarLinks(req, AVALIACAO.ENTITY);
    const response = await this.avaliacaoServiceList.list(
      page ? Number(page) : PAGINATION.PAGE,
      pageSize ? Number(pageSize) : PAGINATION.PAGESIZE,
      props ? props : AVALIACAO.FIELDS.DESCRICAO,
      order ? order : PAGINATION.ASC,
      search,
    );
    const pageLinks = geraPageLinks(req, response, AVALIACAO.ENTITY);
    if (pageLinks) Object.assign(link, pageLinks);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de avaliacaoes recuperada!',
      response,
      req.path,
      null,
      link,
    );
  }
}
