import { Body, Controller, HttpCode, HttpStatus, Param, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { ROLE } from '../constants/role.constants';
import { RoleRequest } from '../dto/request/role.request';
import { RoleResponse } from '../dto/response/role.response';
import { RoleServiceUpdate } from '../service/role.service.update';

@ApiTags('Role')
@Controller(ROTA.ROLE.BASE)
export class RoleControllerUpdate {
  constructor(private readonly roleServiceUpdate: RoleServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.ROLE.UPDATE)
  async update(
    @Param('id') id: string,
    @Body() request: RoleRequest,
    @Req() req: Request,
  ): Promise<Result<RoleResponse>> {
    const response = await this.roleServiceUpdate.update(Number(id), request);
    const link = gerarLinks(req, ROLE.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Role alterado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
