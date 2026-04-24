import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Role } from '../../role/entities/role.entity';

@Entity('USUARIO_ROLE')
export class UsuarioRole extends BaseEntity {
  @PrimaryColumn({ name: 'USUARIO_ID', type: 'int' })
  usuarioId: number = 0;

  @PrimaryColumn({ name: 'ROLE_ID', type: 'int' })
  roleId: number = 0;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuarioRoles)
  @JoinColumn({ name: 'USUARIO_ID' })
  usuario?: Usuario;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'ROLE_ID' })
  role?: Role;

  constructor(data: Partial<UsuarioRole> = {}) {
    super();
    Object.assign(this, data);
  }
}
