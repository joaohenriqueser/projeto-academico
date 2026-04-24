import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvaliacaoControllerCreate } from './controller/avaliacao.controller.create';
import { AvaliacaoControllerFindAll } from './controller/avaliacao.controller.findall';
import { AvaliacaoControllerFindOne } from './controller/avaliacao.controller.findone';
import { AvaliacaoControllerRemove } from './controller/avaliacao.controller.remove';
import { AvaliacaoControllerUpdate } from './controller/avaliacao.controller.update';
import { Avaliacao } from './entities/avaliacao.entity';
import { AvaliacaoServiceCreate } from './service/avaliacao.service.create';
import { AvaliacaoServiceFindOne } from './service/avaliacao.service.findone';
import { AvaliacaoServiceRemove } from './service/avaliacao.service.remove';
import { AvaliacaoServiceUpdate } from './service/avaliacao.service.update';
import { AvaliacaoServiceList } from './service/avaliacao.service.list';

const avaliacaoControllers = [
  AvaliacaoControllerFindAll,
  AvaliacaoControllerFindOne,
  AvaliacaoControllerCreate,
  AvaliacaoControllerUpdate,
  AvaliacaoControllerRemove,
];

const avaliacaoServices = [
  AvaliacaoServiceCreate,
  AvaliacaoServiceUpdate,
  AvaliacaoServiceRemove,
  AvaliacaoServiceList,
  AvaliacaoServiceFindOne,
];

@Module({
  imports: [TypeOrmModule.forFeature([Avaliacao])],
  controllers: [...avaliacaoControllers],
  providers: [...avaliacaoServices],
  exports: [TypeOrmModule, ...avaliacaoServices],
})
export class AvaliacaoModule {}
