import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Disciplina } from '../../disciplina/entities/disciplina.entity';

@Entity('professor')
export class Professor extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'ID_PROFESSOR',
    type: 'int',
  })
  idProfessor?: number;

  @Column({
    name: 'COD_PROFESSOR',
    type: 'varchar',
    length: 10,
    unique: true,
  })
  codProfessor: string = '';

  @Column({
    name: 'NOME_PROFESSOR',
    type: 'varchar',
    length: 50,
  })
  nomeProfessor: string = '';

  @Column({ name: 'ID_USUARIO', type: 'int' })
  idUsuario: number = 0;

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'ID_USUARIO' })
  usuario?: Usuario;

  @OneToMany(() => Disciplina, (d) => d.professor)
  disciplinas?: Disciplina[];

  constructor(data: Partial<Professor> = {}) {
    super();
    Object.assign(this, data);
  }
}
