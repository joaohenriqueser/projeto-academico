import { Controller, Delete, HttpCode, HttpStatus, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { DISCIPLINA } from '../constants/disciplina.constants';
import { DisciplinaServiceRemove } from '../service/disciplina.service.remove';

@ApiTags('Disciplina')
@Controller(ROTA.DISCIPLINA.BASE)
export class DisciplinaControllerRemove {
  constructor(private readonly disciplinaServiceRemove: DisciplinaServiceRemove) {}

  @HttpCode(HttpStatus.OK)
  @Delete(ROTA.DISCIPLINA.DELETE)
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Result<boolean>> {
    const response = await this.disciplinaServiceRemove.remove(Number(id));
    const link = gerarLinks(req, DISCIPLINA.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Disciplina excluído com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
