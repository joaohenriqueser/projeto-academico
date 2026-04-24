import { Body, Controller, HttpCode, HttpStatus, Param, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { RECURSO } from '../constants/recurso.constants';
import { RecursoRequest } from '../dto/request/recurso.request';
import { RecursoResponse } from '../dto/response/recurso.response';
import { RecursoServiceUpdate } from '../service/recurso.service.update';

@ApiTags('Recurso')
@Controller(ROTA.RECURSO.BASE)
export class RecursoControllerUpdate {
  constructor(private readonly recursoServiceUpdate: RecursoServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.RECURSO.UPDATE)
  async update(
    @Param('id') id: string,
    @Body() request: RecursoRequest,
    @Req() req: Request,
  ): Promise<Result<RecursoResponse>> {
    const response = await this.recursoServiceUpdate.update(Number(id), request);
    const link = gerarLinks(req, RECURSO.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Recurso alterado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
