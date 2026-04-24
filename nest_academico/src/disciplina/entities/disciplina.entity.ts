import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Professor } from '../../professor/entities/professor.entity';

@Entity('disciplina')
export class Disciplina extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'ID_DISCIPLINA', type: 'int' })
  idDisciplina?: number;

  @Column({ name: 'PERIODO', type: 'int' })
  periodo: number = 0;

  @Column({ name: 'NOME_DISCIPLINA', type: 'varchar', length: 50 })
  nomeDisciplina: string = '';

  @Column({ name: 'ID_PROFESSOR', type: 'int', nullable: true })
  idProfessor?: number;

  @ManyToOne(() => Professor, { eager: true, nullable: true })
  @JoinColumn({ name: 'ID_PROFESSOR' })
  professor?: Professor;

  constructor(data: Partial<Disciplina> = {}) {
    super();
    Object.assign(this, data);
  }
}
