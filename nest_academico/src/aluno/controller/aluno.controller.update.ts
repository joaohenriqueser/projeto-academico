import { Body, Controller, HttpCode, HttpStatus, Param, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { ALUNO } from '../constants/aluno.constants';
import { AlunoRequest } from '../dto/request/aluno.request';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceUpdate } from '../service/aluno.service.update';

@ApiTags('Aluno')
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerUpdate {
  constructor(private readonly alunoServiceUpdate: AlunoServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.ALUNO.UPDATE)
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() alunoRequest: AlunoRequest,
  ): Promise<Result<AlunoResponse>> {
    const response = await this.alunoServiceUpdate.update(Number(id), alunoRequest);
    const link = gerarLinks(req, ALUNO.ENTITY, response.idAluno);

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Aluno atualizado com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
