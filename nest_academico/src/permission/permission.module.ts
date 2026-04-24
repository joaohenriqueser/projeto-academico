import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionControllerCreate } from './controller/permission.controller.create';
import { PermissionControllerFindAll } from './controller/permission.controller.findall';
import { PermissionControllerFindOne } from './controller/permission.controller.findone';
import { PermissionControllerRemove } from './controller/permission.controller.remove';
import { PermissionControllerUpdate } from './controller/permission.controller.update';
import { Permission } from './entities/permission.entity';
import { PermissionServiceCreate } from './service/permission.service.create';
import { PermissionServiceFindOne } from './service/permission.service.findone';
import { PermissionServiceRemove } from './service/permission.service.remove';
import { PermissionServiceUpdate } from './service/permission.service.update';
import { PermissionServiceList } from './service/permission.service.list';

const permissionControllers = [
  PermissionControllerFindAll,
  PermissionControllerFindOne,
  PermissionControllerCreate,
  PermissionControllerUpdate,
  PermissionControllerRemove,
];

const permissionServices = [
  PermissionServiceCreate,
  PermissionServiceUpdate,
  PermissionServiceRemove,
  PermissionServiceList,
  PermissionServiceFindOne,
];

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [...permissionControllers],
  providers: [...permissionServices],
  exports: [TypeOrmModule, ...permissionServices],
})
export class PermissionModule {}
