import { Controller, Delete, HttpCode, HttpStatus, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { ALUNO } from '../constants/aluno.constants';
import { AlunoServiceRemove } from '../service/aluno.service.remove';

@ApiTags('Aluno')
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerRemove {
  constructor(private readonly alunoServiceRemove: AlunoServiceRemove) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(ROTA.ALUNO.DELETE)
  async remove(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<Result<void>> {
    await this.alunoServiceRemove.remove(Number(id));
    const link = gerarLinks(req, ALUNO.ENTITY);

    return MensagemSistema.showMensagem(
      HttpStatus.NO_CONTENT,
      'Aluno excluído com sucesso!',
      null,
      req.path,
      null,
      link,
    );
  }
}
