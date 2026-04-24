import { Controller, Get, HttpCode, HttpStatus, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { ALUNO } from '../constants/aluno.constants';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceFindOne } from '../service/aluno.service.findone';

@ApiTags('Aluno')
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerFindOne {
  constructor(private readonly alunoServiceFindOne: AlunoServiceFindOne) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.ALUNO.BY_ID)
  async findOne(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<Result<AlunoResponse>> {
    const response = await this.alunoServiceFindOne.findOne(Number(id));
    const link = gerarLinks(req, ALUNO.ENTITY, response.idAluno);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Aluno recuperado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
