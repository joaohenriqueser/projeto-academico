import { Permission } from '../../entities/permission.entity';

export class PermissionResponse {
  idPermission?: any;
  roleId?: any;
  recursoId?: any;
  action?: any;
  possession?: any;
  attributes?: any;

  constructor(entity: Permission) {
    this.idPermission = entity.idPermission;
    this.roleId = entity.roleId;
    this.recursoId = entity.recursoId;
    this.action = entity.action;
    this.possession = entity.possession;
    this.attributes = entity.attributes;
  }
}
