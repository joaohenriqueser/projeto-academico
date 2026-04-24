import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { AlunoDisciplina } from '../../aluno-disciplina/entities/aluno-disciplina.entity';
import { AlunoAvaliacao } from '../../aluno-avaliacao/entities/aluno-avaliacao.entity';

@Entity('aluno')
export class Aluno extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'ID_ALUNO',
    type: 'int',
  })
  idAluno?: number;

  @Column({
    name: 'COD_ALUNO',
    type: 'varchar',
    length: 10,
    unique: true,
  })
  codAluno: string = '';

  @Column({
    name: 'NOME_ALUNO',
    type: 'varchar',
    length: 50,
  })
  nomeAluno: string = '';

  @Column({
    name: 'IDADE',
    type: 'int',
    nullable: true,
  })
  idade?: number;

  @Column({ name: 'ID_USUARIO', type: 'int' })
  idUsuario: number = 0;

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'ID_USUARIO' })
  usuario?: Usuario;

  @OneToMany(() => AlunoDisciplina, (ad) => ad.aluno)
  alunoDisciplinas?: AlunoDisciplina[];

  @OneToMany(() => AlunoAvaliacao, (aa) => aa.aluno)
  alunoAvaliacoes?: AlunoAvaliacao[];

  constructor(data: Partial<Aluno> = {}) {
    super();
    Object.assign(this, data);
  }
}
