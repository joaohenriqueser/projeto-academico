import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { ALUNO } from '../constants/aluno.constants';
import { AlunoRequest } from '../dto/request/aluno.request';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceCreate } from '../service/aluno.service.create';

@ApiTags('Aluno')
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerCreate {
  constructor(private readonly alunoServiceCreate: AlunoServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.ALUNO.CREATE)
  async create(
    @Req() req: Request,
    @Body() alunoRequest: AlunoRequest,
  ): Promise<Result<AlunoResponse>> {
    const response = await this.alunoServiceCreate.create(alunoRequest);
    const link = gerarLinks(req, ALUNO.ENTITY, response.idAluno);

    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Aluno cadastrado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
