import { Controller, Get, HttpCode, HttpStatus, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { ROLE } from '../constants/role.constants';
import { RoleResponse } from '../dto/response/role.response';
import { RoleServiceFindOne } from '../service/role.service.findone';

@ApiTags('Role')
@Controller(ROTA.ROLE.BASE)
export class RoleControllerFindOne {
  constructor(private readonly roleServiceFindOne: RoleServiceFindOne) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.ROLE.BY_ID)
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Result<RoleResponse>> {
    const response = await this.roleServiceFindOne.findOne(Number(id));
    const link = gerarLinks(req, ROLE.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Role encontrado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
