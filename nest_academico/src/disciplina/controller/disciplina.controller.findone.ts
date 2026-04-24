import { Controller, Get, HttpCode, HttpStatus, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { DISCIPLINA } from '../constants/disciplina.constants';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { DisciplinaServiceFindOne } from '../service/disciplina.service.findone';

@ApiTags('Disciplina')
@Controller(ROTA.DISCIPLINA.BASE)
export class DisciplinaControllerFindOne {
  constructor(private readonly disciplinaServiceFindOne: DisciplinaServiceFindOne) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.DISCIPLINA.BY_ID)
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Result<DisciplinaResponse>> {
    const response = await this.disciplinaServiceFindOne.findOne(Number(id));
    const link = gerarLinks(req, DISCIPLINA.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Disciplina encontrado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
