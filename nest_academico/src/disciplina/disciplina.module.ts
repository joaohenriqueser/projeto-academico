import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplinaControllerCreate } from './controller/disciplina.controller.create';
import { DisciplinaControllerFindAll } from './controller/disciplina.controller.findall';
import { DisciplinaControllerFindOne } from './controller/disciplina.controller.findone';
import { DisciplinaControllerRemove } from './controller/disciplina.controller.remove';
import { DisciplinaControllerUpdate } from './controller/disciplina.controller.update';
import { Disciplina } from './entities/disciplina.entity';
import { DisciplinaServiceCreate } from './service/disciplina.service.create';
import { DisciplinaServiceFindOne } from './service/disciplina.service.findone';
import { DisciplinaServiceRemove } from './service/disciplina.service.remove';
import { DisciplinaServiceUpdate } from './service/disciplina.service.update';
import { DisciplinaServiceList } from './service/disciplina.service.list';

const disciplinaControllers = [
  DisciplinaControllerFindAll,
  DisciplinaControllerFindOne,
  DisciplinaControllerCreate,
  DisciplinaControllerUpdate,
  DisciplinaControllerRemove,
];

const disciplinaServices = [
  DisciplinaServiceCreate,
  DisciplinaServiceUpdate,
  DisciplinaServiceRemove,
  DisciplinaServiceList,
  DisciplinaServiceFindOne,
];

@Module({
  imports: [TypeOrmModule.forFeature([Disciplina])],
  controllers: [...disciplinaControllers],
  providers: [...disciplinaServices],
  exports: [TypeOrmModule, ...disciplinaServices],
})
export class DisciplinaModule {}
