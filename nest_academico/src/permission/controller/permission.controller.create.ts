import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { PERMISSION } from '../constants/permission.constants';
import { PermissionRequest } from '../dto/request/permission.request';
import { PermissionResponse } from '../dto/response/permission.response';
import { PermissionServiceCreate } from '../service/permission.service.create';

@ApiTags('Permission')
@Controller(ROTA.PERMISSION.BASE)
export class PermissionControllerCreate {
  constructor(private readonly permissionServiceCreate: PermissionServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.PERMISSION.CREATE)
  async create(
    @Body() request: PermissionRequest,
    @Req() req: Request,
  ): Promise<Result<PermissionResponse>> {
    const response = await this.permissionServiceCreate.create(request);
    const link = gerarLinks(req, PERMISSION.ENTITY, response.idPermission);
    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Permission criado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
