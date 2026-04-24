import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { DISCIPLINA } from '../constants/disciplina.constants';
import { DisciplinaRequest } from '../dto/request/disciplina.request';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { DisciplinaServiceCreate } from '../service/disciplina.service.create';

@ApiTags('Disciplina')
@Controller(ROTA.DISCIPLINA.BASE)
export class DisciplinaControllerCreate {
  constructor(private readonly disciplinaServiceCreate: DisciplinaServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.DISCIPLINA.CREATE)
  async create(
    @Body() request: DisciplinaRequest,
    @Req() req: Request,
  ): Promise<Result<DisciplinaResponse>> {
    const response = await this.disciplinaServiceCreate.create(request);
    const link = gerarLinks(req, DISCIPLINA.ENTITY, response.idDisciplina);
    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Disciplina criado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
