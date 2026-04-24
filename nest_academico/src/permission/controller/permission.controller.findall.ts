import { Controller, Get, HttpCode, HttpStatus, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks, geraPageLinks } from '../../commons/utils/hateoas.utils';
import { PERMISSION } from '../constants/permission.constants';
import { PermissionResponse } from '../dto/response/permission.response';
import { PermissionServiceList } from '../service/permission.service.list';
import { Page } from '../../commons/pagination/page.sistema';
import { PAGINATION } from '../../commons/enum/paginacao.enum';

@ApiTags('Permission')
@Controller(ROTA.PERMISSION.BASE)
export class PermissionControllerFindAll {
  constructor(private readonly permissionServiceList: PermissionServiceList) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.PERMISSION.LIST)
  async list(
    @Req() req: Request,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('props') props?: string,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('searchTerm') search?: string,
  ): Promise<Result<Page<PermissionResponse>>> {
    const link = gerarLinks(req, PERMISSION.ENTITY);
    const response = await this.permissionServiceList.list(
      page ? Number(page) : PAGINATION.PAGE,
      pageSize ? Number(pageSize) : PAGINATION.PAGESIZE,
      props ? props : PERMISSION.FIELDS.ACTION,
      order ? order : PAGINATION.ASC,
      search,
    );
    const pageLinks = geraPageLinks(req, response, PERMISSION.ENTITY);
    if (pageLinks) Object.assign(link, pageLinks);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de permissiones recuperada!',
      response,
      req.path,
      null,
      link,
    );
  }
}
