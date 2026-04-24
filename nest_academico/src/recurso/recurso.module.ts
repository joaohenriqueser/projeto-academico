import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecursoControllerCreate } from './controller/recurso.controller.create';
import { RecursoControllerFindAll } from './controller/recurso.controller.findall';
import { RecursoControllerFindOne } from './controller/recurso.controller.findone';
import { RecursoControllerRemove } from './controller/recurso.controller.remove';
import { RecursoControllerUpdate } from './controller/recurso.controller.update';
import { Recurso } from './entities/recurso.entity';
import { RecursoServiceCreate } from './service/recurso.service.create';
import { RecursoServiceFindOne } from './service/recurso.service.findone';
import { RecursoServiceRemove } from './service/recurso.service.remove';
import { RecursoServiceUpdate } from './service/recurso.service.update';
import { RecursoServiceList } from './service/recurso.service.list';

const recursoControllers = [
  RecursoControllerFindAll,
  RecursoControllerFindOne,
  RecursoControllerCreate,
  RecursoControllerUpdate,
  RecursoControllerRemove,
];

const recursoServices = [
  RecursoServiceCreate,
  RecursoServiceUpdate,
  RecursoServiceRemove,
  RecursoServiceList,
  RecursoServiceFindOne,
];

@Module({
  imports: [TypeOrmModule.forFeature([Recurso])],
  controllers: [...recursoControllers],
  providers: [...recursoServices],
  exports: [TypeOrmModule, ...recursoServices],
})
export class RecursoModule {}
