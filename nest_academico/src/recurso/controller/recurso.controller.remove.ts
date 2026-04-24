import { Controller, Delete, HttpCode, HttpStatus, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { RECURSO } from '../constants/recurso.constants';
import { RecursoServiceRemove } from '../service/recurso.service.remove';

@ApiTags('Recurso')
@Controller(ROTA.RECURSO.BASE)
export class RecursoControllerRemove {
  constructor(private readonly recursoServiceRemove: RecursoServiceRemove) {}

  @HttpCode(HttpStatus.OK)
  @Delete(ROTA.RECURSO.DELETE)
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Result<boolean>> {
    const response = await this.recursoServiceRemove.remove(Number(id));
    const link = gerarLinks(req, RECURSO.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Recurso excluído com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
