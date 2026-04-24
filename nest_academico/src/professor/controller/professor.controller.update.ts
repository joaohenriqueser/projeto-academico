import { Body, Controller, HttpCode, HttpStatus, Param, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { PROFESSOR } from '../constants/professor.constants';
import { ProfessorRequest } from '../dto/request/professor.request';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceUpdate } from '../service/professor.service.update';

@ApiTags('Professor')
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerUpdate {
  constructor(private readonly professorServiceUpdate: ProfessorServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.PROFESSOR.UPDATE)
  async update(
    @Param('id') id: string,
    @Body() request: ProfessorRequest,
    @Req() req: Request,
  ): Promise<Result<ProfessorResponse>> {
    const response = await this.professorServiceUpdate.update(Number(id), request);
    const link = gerarLinks(req, PROFESSOR.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Professor alterado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
