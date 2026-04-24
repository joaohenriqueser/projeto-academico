import { Body, Controller, HttpCode, HttpStatus, Param, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { PERMISSION } from '../constants/permission.constants';
import { PermissionRequest } from '../dto/request/permission.request';
import { PermissionResponse } from '../dto/response/permission.response';
import { PermissionServiceUpdate } from '../service/permission.service.update';

@ApiTags('Permission')
@Controller(ROTA.PERMISSION.BASE)
export class PermissionControllerUpdate {
  constructor(private readonly permissionServiceUpdate: PermissionServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.PERMISSION.UPDATE)
  async update(
    @Param('id') id: string,
    @Body() request: PermissionRequest,
    @Req() req: Request,
  ): Promise<Result<PermissionResponse>> {
    const response = await this.permissionServiceUpdate.update(Number(id), request);
    const link = gerarLinks(req, PERMISSION.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Permission alterado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
