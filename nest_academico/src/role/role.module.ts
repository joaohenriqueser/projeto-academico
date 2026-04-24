import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleControllerCreate } from './controller/role.controller.create';
import { RoleControllerFindAll } from './controller/role.controller.findall';
import { RoleControllerFindOne } from './controller/role.controller.findone';
import { RoleControllerRemove } from './controller/role.controller.remove';
import { RoleControllerUpdate } from './controller/role.controller.update';
import { Role } from './entities/role.entity';
import { RoleServiceCreate } from './service/role.service.create';
import { RoleServiceFindOne } from './service/role.service.findone';
import { RoleServiceRemove } from './service/role.service.remove';
import { RoleServiceUpdate } from './service/role.service.update';
import { RoleServiceList } from './service/role.service.list';

const roleControllers = [
  RoleControllerFindAll,
  RoleControllerFindOne,
  RoleControllerCreate,
  RoleControllerUpdate,
  RoleControllerRemove,
];

const roleServices = [
  RoleServiceCreate,
  RoleServiceUpdate,
  RoleServiceRemove,
  RoleServiceList,
  RoleServiceFindOne,
];

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [...roleControllers],
  providers: [...roleServices],
  exports: [TypeOrmModule, ...roleServices],
})
export class RoleModule {}
