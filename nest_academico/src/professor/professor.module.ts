import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorControllerCreate } from './controller/professor.controller.create';
import { ProfessorControllerFindAll } from './controller/professor.controller.findall';
import { ProfessorControllerFindOne } from './controller/professor.controller.findone';
import { ProfessorControllerRemove } from './controller/professor.controller.remove';
import { ProfessorControllerUpdate } from './controller/professor.controller.update';
import { Professor } from './entities/professor.entity';
import { ProfessorServiceCreate } from './service/professor.service.create';
import { ProfessorServiceFindOne } from './service/professor.service.findone';
import { ProfessorServiceRemove } from './service/professor.service.remove';
import { ProfessorServiceUpdate } from './service/professor.service.update';
import { ProfessorServiceList } from './service/professor.service.list';

const professorControllers = [
  ProfessorControllerFindAll,
  ProfessorControllerFindOne,
  ProfessorControllerCreate,
  ProfessorControllerUpdate,
  ProfessorControllerRemove,
];

const professorServices = [
  ProfessorServiceCreate,
  ProfessorServiceUpdate,
  ProfessorServiceRemove,
  ProfessorServiceList,
  ProfessorServiceFindOne,
];

@Module({
  imports: [TypeOrmModule.forFeature([Professor])],
  controllers: [...professorControllers],
  providers: [...professorServices],
  exports: [TypeOrmModule, ...professorServices],
})
export class ProfessorModule {}
