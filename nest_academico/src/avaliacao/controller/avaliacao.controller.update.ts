import { Body, Controller, HttpCode, HttpStatus, Param, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { AVALIACAO } from '../constants/avaliacao.constants';
import { AvaliacaoRequest } from '../dto/request/avaliacao.request';
import { AvaliacaoResponse } from '../dto/response/avaliacao.response';
import { AvaliacaoServiceUpdate } from '../service/avaliacao.service.update';

@ApiTags('Avaliacao')
@Controller(ROTA.AVALIACAO.BASE)
export class AvaliacaoControllerUpdate {
  constructor(private readonly avaliacaoServiceUpdate: AvaliacaoServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.AVALIACAO.UPDATE)
  async update(
    @Param('id') id: string,
    @Body() request: AvaliacaoRequest,
    @Req() req: Request,
  ): Promise<Result<AvaliacaoResponse>> {
    const response = await this.avaliacaoServiceUpdate.update(Number(id), request);
    const link = gerarLinks(req, AVALIACAO.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Avaliacao alterado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
