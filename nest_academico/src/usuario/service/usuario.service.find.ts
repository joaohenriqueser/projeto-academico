import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioServiceFind {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { username } });
  }

  async findById(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { idUsuario: id } });
  }


  async save(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(usuario);
  }
}
