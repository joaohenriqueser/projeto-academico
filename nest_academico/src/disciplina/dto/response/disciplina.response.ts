import { Disciplina } from '../../entities/disciplina.entity';

export class DisciplinaResponse {
  idDisciplina?: any;
  periodo?: any;
  nomeDisciplina?: any;
  idProfessor?: any;

  constructor(entity: Disciplina) {
    this.idDisciplina = entity.idDisciplina;
    this.periodo = entity.periodo;
    this.nomeDisciplina = entity.nomeDisciplina;
    this.idProfessor = entity.idProfessor;
  }
}
