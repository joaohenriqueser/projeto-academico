import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROTA } from '../commons/constants/url.sistema';

@ApiTags('Resources')
@Controller('rest/resources')
export class ResourcesController {
  @Get()
  @HttpCode(HttpStatus.OK)
  getResources() {
    return [
      { name: 'cidade', endpoint: ROTA.CIDADE.BASE + ROTA.CIDADE.LIST, method: ['GET'] },
      { name: 'cidade', endpoint: ROTA.CIDADE.BASE + ROTA.CIDADE.BY_ID, method: ['GET'] },
      { name: 'cidade', endpoint: ROTA.CIDADE.BASE + ROTA.CIDADE.CREATE, method: ['POST'] },
      { name: 'cidade', endpoint: ROTA.CIDADE.BASE + ROTA.CIDADE.UPDATE, method: ['PUT'] },
      { name: 'cidade', endpoint: ROTA.CIDADE.BASE + ROTA.CIDADE.DELETE, method: ['DELETE'] },
      { name: 'usuario', endpoint: ROTA.USUARIO.BASE + ROTA.USUARIO.LIST, method: ['GET'] },
      { name: 'usuario', endpoint: ROTA.USUARIO.BASE + ROTA.USUARIO.BY_ID, method: ['GET'] },
      { name: 'usuario', endpoint: ROTA.USUARIO.BASE + ROTA.USUARIO.CREATE, method: ['POST'] },
      { name: 'usuario', endpoint: ROTA.USUARIO.BASE + ROTA.USUARIO.UPDATE, method: ['PUT'] },
      { name: 'usuario', endpoint: ROTA.USUARIO.BASE + ROTA.USUARIO.DELETE, method: ['DELETE'] },
      { name: 'professor', endpoint: ROTA.PROFESSOR.BASE + ROTA.PROFESSOR.LIST, method: ['GET'] },
      { name: 'professor', endpoint: ROTA.PROFESSOR.BASE + ROTA.PROFESSOR.BY_ID, method: ['GET'] },
      { name: 'professor', endpoint: ROTA.PROFESSOR.BASE + ROTA.PROFESSOR.CREATE, method: ['POST'] },
      { name: 'professor', endpoint: ROTA.PROFESSOR.BASE + ROTA.PROFESSOR.UPDATE, method: ['PUT'] },
      { name: 'professor', endpoint: ROTA.PROFESSOR.BASE + ROTA.PROFESSOR.DELETE, method: ['DELETE'] },
      { name: 'aluno', endpoint: ROTA.ALUNO.BASE + ROTA.ALUNO.LIST, method: ['GET'] },
      { name: 'aluno', endpoint: ROTA.ALUNO.BASE + ROTA.ALUNO.BY_ID, method: ['GET'] },
      { name: 'aluno', endpoint: ROTA.ALUNO.BASE + ROTA.ALUNO.CREATE, method: ['POST'] },
      { name: 'aluno', endpoint: ROTA.ALUNO.BASE + ROTA.ALUNO.UPDATE, method: ['PUT'] },
      { name: 'aluno', endpoint: ROTA.ALUNO.BASE + ROTA.ALUNO.DELETE, method: ['DELETE'] },
      { name: 'disciplina', endpoint: ROTA.DISCIPLINA.BASE + ROTA.DISCIPLINA.LIST, method: ['GET'] },
      { name: 'disciplina', endpoint: ROTA.DISCIPLINA.BASE + ROTA.DISCIPLINA.BY_ID, method: ['GET'] },
      { name: 'disciplina', endpoint: ROTA.DISCIPLINA.BASE + ROTA.DISCIPLINA.CREATE, method: ['POST'] },
      { name: 'disciplina', endpoint: ROTA.DISCIPLINA.BASE + ROTA.DISCIPLINA.UPDATE, method: ['PUT'] },
      { name: 'disciplina', endpoint: ROTA.DISCIPLINA.BASE + ROTA.DISCIPLINA.DELETE, method: ['DELETE'] },
      { name: 'avaliacao', endpoint: ROTA.AVALIACAO.BASE + ROTA.AVALIACAO.LIST, method: ['GET'] },
      { name: 'avaliacao', endpoint: ROTA.AVALIACAO.BASE + ROTA.AVALIACAO.BY_ID, method: ['GET'] },
      { name: 'avaliacao', endpoint: ROTA.AVALIACAO.BASE + ROTA.AVALIACAO.CREATE, method: ['POST'] },
      { name: 'avaliacao', endpoint: ROTA.AVALIACAO.BASE + ROTA.AVALIACAO.UPDATE, method: ['PUT'] },
      { name: 'avaliacao', endpoint: ROTA.AVALIACAO.BASE + ROTA.AVALIACAO.DELETE, method: ['DELETE'] },
    ];
  }
}
