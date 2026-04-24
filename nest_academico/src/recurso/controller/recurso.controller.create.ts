import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { RECURSO } from '../constants/recurso.constants';
import { RecursoRequest } from '../dto/request/recurso.request';
import { RecursoResponse } from '../dto/response/recurso.response';
import { RecursoServiceCreate } from '../service/recurso.service.create';

@ApiTags('Recurso')
@Controller(ROTA.RECURSO.BASE)
export class RecursoControllerCreate {
  constructor(private readonly recursoServiceCreate: RecursoServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.RECURSO.CREATE)
  async create(
    @Body() request: RecursoRequest,
    @Req() req: Request,
  ): Promise<Result<RecursoResponse>> {
    const response = await this.recursoServiceCreate.create(request);
    const link = gerarLinks(req, RECURSO.ENTITY, response.idRecurso);
    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Recurso criado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
