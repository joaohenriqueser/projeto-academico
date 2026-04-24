import { Controller, Get, HttpCode, HttpStatus, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { PERMISSION } from '../constants/permission.constants';
import { PermissionResponse } from '../dto/response/permission.response';
import { PermissionServiceFindOne } from '../service/permission.service.findone';

@ApiTags('Permission')
@Controller(ROTA.PERMISSION.BASE)
export class PermissionControllerFindOne {
  constructor(private readonly permissionServiceFindOne: PermissionServiceFindOne) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.PERMISSION.BY_ID)
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Result<PermissionResponse>> {
    const response = await this.permissionServiceFindOne.findOne(Number(id));
    const link = gerarLinks(req, PERMISSION.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Permission encontrado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
