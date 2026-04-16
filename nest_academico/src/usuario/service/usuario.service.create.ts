import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';

@Injectable()
export class UsuarioServiceCreate {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(request: UsuarioRequest): Promise<UsuarioResponse> {
    if (request.password !== request.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const existingEmail = await this.usuarioRepository.findOne({ where: { email: request.email } });
    if (existingEmail) {
      throw new BadRequestException('Email already in use');
    }

    const existingUsername = await this.usuarioRepository.findOne({ where: { username: request.username } });
    if (existingUsername) {
      throw new BadRequestException('Username already in use');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(request.password, salt);

    const count = await this.usuarioRepository.count();
    const codeStr = (count + 1).toString().padStart(3, '0');
    const rndCode = `U${codeStr}${Math.floor(Math.random() * 100)}`;

    const usuario = new Usuario({
      firstName: request.firstName,
      lastName: request.lastName,
      username: request.username,
      email: request.email,
      password: hashedPassword,
      codUsuario: rndCode
    });

    const savedUsuario = await this.usuarioRepository.save(usuario);

    return new UsuarioResponse({
      idUsuario: savedUsuario.idUsuario,
      firstName: savedUsuario.firstName,
      lastName: savedUsuario.lastName,
      username: savedUsuario.username,
      email: savedUsuario.email,
    });
  }
}

