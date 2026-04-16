import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioResponse } from '../dto/response/usuario.response';

@Injectable()
export class UsuarioServiceList {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async list(): Promise<UsuarioResponse[]> {
    const usuarios = await this.usuarioRepository.find();
    return usuarios.map(
      (usuario) =>
        new UsuarioResponse({
          idUsuario: usuario.idUsuario,
          firstName: usuario.firstName,
          lastName: usuario.lastName,
          username: usuario.username,
          email: usuario.email,
        }),
    );
  }
}
