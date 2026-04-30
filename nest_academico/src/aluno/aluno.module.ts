import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { AlunoControllerCreate } from './controller/aluno.controller.create';
import { AlunoControllerFindAll } from './controller/aluno.controller.findall';
import { AlunoControllerFindOne } from './controller/aluno.controller.findone';
import { AlunoControllerRemove } from './controller/aluno.controller.remove';
import { AlunoControllerUpdate } from './controller/aluno.controller.update';
import { AlunoServiceCreate } from './service/aluno.service.create';
import { AlunoServiceFindOne } from './service/aluno.service.findone';
import { AlunoServiceList } from './service/aluno.service.list';
import { AlunoServiceRemove } from './service/aluno.service.remove';
import { AlunoServiceUpdate } from './service/aluno.service.update';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aluno]),
    UsuarioModule,
  ],
  controllers: [
    AlunoControllerCreate,
    AlunoControllerFindAll,
    AlunoControllerFindOne,
    AlunoControllerRemove,
    AlunoControllerUpdate,
  ],
  providers: [
    AlunoServiceCreate,
    AlunoServiceFindOne,
    AlunoServiceList,
    AlunoServiceRemove,
    AlunoServiceUpdate,
  ],
})
export class AlunoModule {}
