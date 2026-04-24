import { Role } from '../../entities/role.entity';

export class RoleResponse {
  idRole?: any;
  nomeRole?: any;

  constructor(entity: Role) {
    this.idRole = entity.idRole;
    this.nomeRole = entity.nomeRole;
  }
}
