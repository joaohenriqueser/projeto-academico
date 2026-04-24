import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';

@Entity('RECURSO')
export class Recurso extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'IDRECURSO', type: 'int' })
  idRecurso?: number;

  @Column({ name: 'NOMERECURSO', type: 'varchar', length: 100, unique: true })
  nomeRecurso: string = '';

  constructor(data: Partial<Recurso> = {}) {
    super();
    Object.assign(this, data);
  }
}
