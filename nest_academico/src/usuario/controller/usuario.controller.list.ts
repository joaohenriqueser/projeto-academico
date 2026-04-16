import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { USUARIO } from '../constants/usuario.constants';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceList } from '../service/usuario.service.list';

@ApiTags('Usuário')
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerList {
  constructor(private readonly usuarioServiceList: UsuarioServiceList) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.USUARIO.LIST)
  async list(@Req() req: Request): Promise<Result<UsuarioResponse[]>> {
    const _link = gerarLinks(req, USUARIO.ENTITY);
    const response = await this.usuarioServiceList.list();

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
