import { Controller, Get, HttpCode, HttpStatus, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks, geraPageLinks } from '../../commons/utils/hateoas.utils';
import { PROFESSOR } from '../constants/professor.constants';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceList } from '../service/professor.service.list';
import { Page } from '../../commons/pagination/page.sistema';
import { PAGINATION } from '../../commons/enum/paginacao.enum';

@ApiTags('Professor')
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerFindAll {
  constructor(private readonly professorServiceList: ProfessorServiceList) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.PROFESSOR.LIST)
  async list(
    @Req() req: Request,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('props') props?: string,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('searchTerm') search?: string,
  ): Promise<Result<Page<ProfessorResponse>>> {
    const link = gerarLinks(req, PROFESSOR.ENTITY);
    const response = await this.professorServiceList.list(
      page ? Number(page) : PAGINATION.PAGE,
      pageSize ? Number(pageSize) : PAGINATION.PAGESIZE,
      props ? props : PROFESSOR.FIELDS.NOME_PROFESSOR,
      order ? order : PAGINATION.ASC,
      search,
    );
    const pageLinks = geraPageLinks(req, response, PROFESSOR.ENTITY);
    if (pageLinks) Object.assign(link, pageLinks);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de professores recuperada!',
      response,
      req.path,
      null,
      link,
    );
  }
}
