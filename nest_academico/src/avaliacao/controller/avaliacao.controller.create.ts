import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { AVALIACAO } from '../constants/avaliacao.constants';
import { AvaliacaoRequest } from '../dto/request/avaliacao.request';
import { AvaliacaoResponse } from '../dto/response/avaliacao.response';
import { AvaliacaoServiceCreate } from '../service/avaliacao.service.create';

@ApiTags('Avaliacao')
@Controller(ROTA.AVALIACAO.BASE)
export class AvaliacaoControllerCreate {
  constructor(private readonly avaliacaoServiceCreate: AvaliacaoServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.AVALIACAO.CREATE)
  async create(
    @Body() request: AvaliacaoRequest,
    @Req() req: Request,
  ): Promise<Result<AvaliacaoResponse>> {
    const response = await this.avaliacaoServiceCreate.create(request);
    const link = gerarLinks(req, AVALIACAO.ENTITY, response.idAvaliacao);
    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Avaliacao criado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
