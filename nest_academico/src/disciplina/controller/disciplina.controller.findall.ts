import { Controller, Get, HttpCode, HttpStatus, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks, geraPageLinks } from '../../commons/utils/hateoas.utils';
import { DISCIPLINA } from '../constants/disciplina.constants';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { DisciplinaServiceList } from '../service/disciplina.service.list';
import { Page } from '../../commons/pagination/page.sistema';
import { PAGINATION } from '../../commons/enum/paginacao.enum';

@ApiTags('Disciplina')
@Controller(ROTA.DISCIPLINA.BASE)
export class DisciplinaControllerFindAll {
  constructor(private readonly disciplinaServiceList: DisciplinaServiceList) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.DISCIPLINA.LIST)
  async list(
    @Req() req: Request,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('props') props?: string,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('searchTerm') search?: string,
  ): Promise<Result<Page<DisciplinaResponse>>> {
    const link = gerarLinks(req, DISCIPLINA.ENTITY);
    const response = await this.disciplinaServiceList.list(
      page ? Number(page) : PAGINATION.PAGE,
      pageSize ? Number(pageSize) : PAGINATION.PAGESIZE,
      props ? props : DISCIPLINA.FIELDS.NOMEDISCIPLINA,
      order ? order : PAGINATION.ASC,
      search,
    );
    const pageLinks = geraPageLinks(req, response, DISCIPLINA.ENTITY);
    if (pageLinks) Object.assign(link, pageLinks);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de disciplinas recuperada!',
      response,
      req.path,
      null,
      link,
    );
  }
}
