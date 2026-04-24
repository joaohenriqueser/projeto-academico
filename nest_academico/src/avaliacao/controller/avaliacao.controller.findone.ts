import { Controller, Get, HttpCode, HttpStatus, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { AVALIACAO } from '../constants/avaliacao.constants';
import { AvaliacaoResponse } from '../dto/response/avaliacao.response';
import { AvaliacaoServiceFindOne } from '../service/avaliacao.service.findone';

@ApiTags('Avaliacao')
@Controller(ROTA.AVALIACAO.BASE)
export class AvaliacaoControllerFindOne {
  constructor(private readonly avaliacaoServiceFindOne: AvaliacaoServiceFindOne) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.AVALIACAO.BY_ID)
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Result<AvaliacaoResponse>> {
    const response = await this.avaliacaoServiceFindOne.findOne(Number(id));
    const link = gerarLinks(req, AVALIACAO.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Avaliacao encontrado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
