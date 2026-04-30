import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { UsuarioRole } from '../../usuario-role/entities/usuario-role.entity';

@Entity('usuario')
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'ID_USUARIO', type: 'int' })
  idUsuario?: number;

  @Column({ name: 'COD_USUARIO', type: 'varchar', length: 10, unique: true })
  codUsuario: string = '';

  @Column({ name: 'FIRST_NAME', type: 'varchar', length: 100 })
  firstName: string = '';

  @Column({ name: 'LAST_NAME', type: 'varchar', length: 100 })
  lastName: string = '';

  @Column({ name: 'USERNAME', type: 'varchar', length: 50, unique: true })
  username: string = '';

  @Column({ name: 'PASSWORD', type: 'varchar', length: 255 })
  password: string = '';

  @Column({ name: 'EMAIL', type: 'varchar', length: 100, nullable: true })
  email?: string;

  @OneToMany(() => UsuarioRole, (ur) => ur.usuario)
  usuarioRoles?: UsuarioRole[];

  constructor(data: Partial<Usuario> = {}) {
    super();
    Object.assign(this, data);
  }
}
