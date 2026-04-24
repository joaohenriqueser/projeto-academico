import { Body, Controller, HttpCode, HttpStatus, Param, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { DISCIPLINA } from '../constants/disciplina.constants';
import { DisciplinaRequest } from '../dto/request/disciplina.request';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { DisciplinaServiceUpdate } from '../service/disciplina.service.update';

@ApiTags('Disciplina')
@Controller(ROTA.DISCIPLINA.BASE)
export class DisciplinaControllerUpdate {
  constructor(private readonly disciplinaServiceUpdate: DisciplinaServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.DISCIPLINA.UPDATE)
  async update(
    @Param('id') id: string,
    @Body() request: DisciplinaRequest,
    @Req() req: Request,
  ): Promise<Result<DisciplinaResponse>> {
    const response = await this.disciplinaServiceUpdate.update(Number(id), request);
    const link = gerarLinks(req, DISCIPLINA.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Disciplina alterado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
