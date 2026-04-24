import { Controller, Delete, HttpCode, HttpStatus, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { gerarLinks } from '../../commons/utils/hateoas.utils';
import { PROFESSOR } from '../constants/professor.constants';
import { ProfessorServiceRemove } from '../service/professor.service.remove';

@ApiTags('Professor')
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerRemove {
  constructor(private readonly professorServiceRemove: ProfessorServiceRemove) {}

  @HttpCode(HttpStatus.OK)
  @Delete(ROTA.PROFESSOR.DELETE)
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Result<boolean>> {
    const response = await this.professorServiceRemove.remove(Number(id));
    const link = gerarLinks(req, PROFESSOR.ENTITY, Number(id));
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Professor excluído com sucesso!',
      response,
      req.path,
      null,
      link,
    );
  }
}
