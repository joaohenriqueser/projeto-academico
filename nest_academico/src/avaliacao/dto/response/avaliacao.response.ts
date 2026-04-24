import { Avaliacao } from '../../entities/avaliacao.entity';

export class AvaliacaoResponse {
  idAvaliacao?: any;
  descricao?: any;
  disciplinaId?: any;

  constructor(entity: Avaliacao) {
    this.idAvaliacao = entity.idAvaliacao;
    this.descricao = entity.descricao;
    this.disciplinaId = entity.disciplinaId;
  }
}
