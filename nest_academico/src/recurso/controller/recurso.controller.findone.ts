import { Controller, Get, HttpCode, HttpStatus, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { RECURSO } from '../constants/recurso.constants';
import { RecursoResponse } from '../dto/response/recurso.response';
import { RecursoServiceFindOne } from '../service/recurso.service.findone';

@ApiTags('Recurso')
@Controller(ROTA.RECURSO.BASE)
export class RecursoControllerFindOne {
  constructor(private readonly recursoServiceFindOne: RecursoServiceFindOne) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.RECURSO.BY_ID)
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Result<RecursoResponse>> {
    const response = await this.recursoServiceFindOne.findOne(Number(id));
    const link = gerarLinks(req, RECURSO.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Recurso encontrado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
