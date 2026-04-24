import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { PROFESSOR } from '../constants/professor.constants';
import { ProfessorRequest } from '../dto/request/professor.request';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceCreate } from '../service/professor.service.create';

@ApiTags('Professor')
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerCreate {
  constructor(private readonly professorServiceCreate: ProfessorServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.PROFESSOR.CREATE)
  async create(
    @Body() request: ProfessorRequest,
    @Req() req: Request,
  ): Promise<Result<ProfessorResponse>> {
    const response = await this.professorServiceCreate.create(request);
    const link = gerarLinks(req, PROFESSOR.ENTITY, response.idProfessor);
    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Professor criado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
