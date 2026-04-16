import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioControllerCreate } from './controller/usuario.controller.create';
import { UsuarioServiceCreate } from './service/usuario.service.create';
import { UsuarioControllerList } from './controller/usuario.controller.list';
import { UsuarioServiceList } from './service/usuario.service.list';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuarioControllerCreate, UsuarioControllerList],
  providers: [UsuarioServiceCreate, UsuarioServiceList],
  exports: [UsuarioServiceCreate, UsuarioServiceList],
})
export class UsuarioModule {}
