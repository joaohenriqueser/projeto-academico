import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { ROLE } from '../constants/role.constants';
import { RoleRequest } from '../dto/request/role.request';
import { RoleResponse } from '../dto/response/role.response';
import { RoleServiceCreate } from '../service/role.service.create';

@ApiTags('Role')
@Controller(ROTA.ROLE.BASE)
export class RoleControllerCreate {
  constructor(private readonly roleServiceCreate: RoleServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.ROLE.CREATE)
  async create(
    @Body() request: RoleRequest,
    @Req() req: Request,
  ): Promise<Result<RoleResponse>> {
    const response = await this.roleServiceCreate.create(request);
    const link = gerarLinks(req, ROLE.ENTITY, response.idRole);
    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Role criado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
