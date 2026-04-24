import { Controller, Delete, HttpCode, HttpStatus, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { ROLE } from '../constants/role.constants';
import { RoleServiceRemove } from '../service/role.service.remove';

@ApiTags('Role')
@Controller(ROTA.ROLE.BASE)
export class RoleControllerRemove {
  constructor(private readonly roleServiceRemove: RoleServiceRemove) {}

  @HttpCode(HttpStatus.OK)
  @Delete(ROTA.ROLE.DELETE)
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Result<boolean>> {
    const response = await this.roleServiceRemove.remove(Number(id));
    const link = gerarLinks(req, ROLE.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Role excluído com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
