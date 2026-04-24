import { Controller, Get, HttpCode, HttpStatus, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks, geraPageLinks } from '../../commons/utils/hateoas.utils';
import { ALUNO } from '../constants/aluno.constants';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceList } from '../service/aluno.service.list';
import { Page } from '../../commons/pagination/page.sistema';
import { PAGINATION } from '../../commons/enum/paginacao.enum';

@ApiTags('Aluno')
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerFindAll {
  constructor(private readonly alunoServiceList: AlunoServiceList) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.ALUNO.LIST)
  async list(
    @Req() req: Request,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('props') props?: string,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('searchTerm') search?: string,
  ): Promise<Result<Page<AlunoResponse>>> {
    const link = gerarLinks(req, ALUNO.ENTITY);
    const response = await this.alunoServiceList.list(
      page ? Number(page) : PAGINATION.PAGE,
      pageSize ? Number(pageSize) : PAGINATION.PAGESIZE,
      props ? props : ALUNO.FIELDS.NOMEALUNO,
      order ? order : PAGINATION.ASC,
      search,
    );
    const pageLinks = geraPageLinks(req, response, ALUNO.ENTITY);
    if (pageLinks) Object.assign(link, pageLinks);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de alunos recuperada!',
      response,
      req.path,
      null,
      link,
    );
  }
}
