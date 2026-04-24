import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Role } from '../../role/entities/role.entity';
import { Recurso } from '../../recurso/entities/recurso.entity';

@Entity('PERMISSIONS')
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'IDPERMISSION', type: 'int' })
  idPermission?: number;

  @Column({ name: 'ROLE_ID', type: 'int' })
  roleId: number = 0;

  @Column({ name: 'RECURSO_ID', type: 'int' })
  recursoId: number = 0;

  @Column({ name: 'ACTION', type: 'varchar', length: 20 })
  action: string = '';

  @Column({ name: 'POSSESSION', type: 'varchar', length: 20 })
  possession: string = '';

  @Column({ name: 'ATTRIBUTES', type: 'varchar', length: 4000, nullable: true })
  attributes?: string;

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'ROLE_ID' })
  role?: Role;

  @ManyToOne(() => Recurso, { eager: true })
  @JoinColumn({ name: 'RECURSO_ID' })
  recurso?: Recurso;

  constructor(data: Partial<Permission> = {}) {
    super();
    Object.assign(this, data);
  }
}
