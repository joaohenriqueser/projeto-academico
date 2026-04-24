import { Controller, Delete, HttpCode, HttpStatus, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { PERMISSION } from '../constants/permission.constants';
import { PermissionServiceRemove } from '../service/permission.service.remove';

@ApiTags('Permission')
@Controller(ROTA.PERMISSION.BASE)
export class PermissionControllerRemove {
  constructor(private readonly permissionServiceRemove: PermissionServiceRemove) {}

  @HttpCode(HttpStatus.OK)
  @Delete(ROTA.PERMISSION.DELETE)
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Result<boolean>> {
    const response = await this.permissionServiceRemove.remove(Number(id));
    const link = gerarLinks(req, PERMISSION.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Permission excluído com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
