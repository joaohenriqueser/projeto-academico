import { Controller, Delete, HttpCode, HttpStatus, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { AVALIACAO } from '../constants/avaliacao.constants';
import { AvaliacaoServiceRemove } from '../service/avaliacao.service.remove';

@ApiTags('Avaliacao')
@Controller(ROTA.AVALIACAO.BASE)
export class AvaliacaoControllerRemove {
  constructor(private readonly avaliacaoServiceRemove: AvaliacaoServiceRemove) {}

  @HttpCode(HttpStatus.OK)
  @Delete(ROTA.AVALIACAO.DELETE)
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Result<boolean>> {
    const response = await this.avaliacaoServiceRemove.remove(Number(id));
    const link = gerarLinks(req, AVALIACAO.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Avaliacao excluído com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
