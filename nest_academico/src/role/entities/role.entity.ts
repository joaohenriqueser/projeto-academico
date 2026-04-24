import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';

@Entity('ROLE')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'IDROLE', type: 'int' })
  idRole?: number;

  @Column({ name: 'NOMEROLE', type: 'varchar', length: 50, unique: true })
  nomeRole: string = '';

  constructor(data: Partial<Role> = {}) {
    super();
    Object.assign(this, data);
  }
}
