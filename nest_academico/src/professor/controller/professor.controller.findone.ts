import { Controller, Get, HttpCode, HttpStatus, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { PROFESSOR } from '../constants/professor.constants';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceFindOne } from '../service/professor.service.findone';

@ApiTags('Professor')
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerFindOne {
  constructor(private readonly professorServiceFindOne: ProfessorServiceFindOne) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.PROFESSOR.BY_ID)
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Result<ProfessorResponse>> {
    const response = await this.professorServiceFindOne.findOne(Number(id));
    const link = gerarLinks(req, PROFESSOR.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Professor encontrado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
