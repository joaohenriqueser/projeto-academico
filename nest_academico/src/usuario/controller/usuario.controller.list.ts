import { Controller, Get, HttpCode, HttpStatus, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks, geraPageLinks } from '../../commons/utils/hateoas.utils';
import { USUARIO } from '../constants/usuario.constants';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceList } from '../service/usuario.service.list';
import { Page } from '../../commons/pagination/page.sistema';
import { PAGINATION } from '../../commons/enum/paginacao.enum';

@ApiTags('Usuário')
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerList {
  constructor(private readonly usuarioServiceList: UsuarioServiceList) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.USUARIO.LIST)
  async list(
    @Req() req: Request,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('props') props?: string,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('searchTerm') search?: string,
  ): Promise<Result<Page<UsuarioResponse>>> {
    const _link = gerarLinks(req, USUARIO.ENTITY);
    const response = await this.usuarioServiceList.list(
      page ? Number(page) : PAGINATION.PAGE,
      pageSize ? Number(pageSize) : PAGINATION.PAGESIZE,
      props ? props : USUARIO.FIELDS.FIRST_NAME,
      order ? order : PAGINATION.ASC,
      search,
    );

    const _pageLinks = geraPageLinks(req, response, USUARIO.ENTITY);
    if (_pageLinks) Object.assign(_link, _pageLinks);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de usuários recuperada com sucesso!',
      response,
      req.path,
      null,
      _link,
    );
  }
}
