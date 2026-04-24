import { Recurso } from '../../entities/recurso.entity';

export class RecursoResponse {
  idRecurso?: any;
  nomeRecurso?: any;

  constructor(entity: Recurso) {
    this.idRecurso = entity.idRecurso;
    this.nomeRecurso = entity.nomeRecurso;
  }
}
