import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Disciplina } from '../../disciplina/entities/disciplina.entity';

@Entity('avaliacao')
export class Avaliacao extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'ID_AVALIACAO', type: 'int' })
  idAvaliacao?: number;

  @Column({ name: 'DESCRICAO', type: 'varchar', length: 100, nullable: true })
  descricao?: string;

  @Column({ name: 'DISCIPLINA_ID', type: 'int' })
  disciplinaId: number = 0;

  @ManyToOne(() => Disciplina)
  @JoinColumn({ name: 'DISCIPLINA_ID' })
  disciplina?: Disciplina;

  constructor(data: Partial<Avaliacao> = {}) {
    super();
    Object.assign(this, data);
  }
}
