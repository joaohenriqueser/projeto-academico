import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import * as bcrypt from 'bcrypt';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class UsuarioServiceCreate {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly mailService: MailService,
  ) {}

  async create(request: UsuarioRequest): Promise<UsuarioResponse> {
    console.log('Recebendo requisição de criação de usuário:', request);

    // Gerar código automático se não enviado
    if (!request.codUsuario) {
      request.codUsuario = 'U' + Math.floor(Math.random() * 100000);
    }

    const existing = await this.usuarioRepository.findOne({
      where: [
        { codUsuario: request.codUsuario },
        { username: request.username },
        { email: request.email },
      ],
    });

    if (existing) {
      console.warn('Usuário já existe:', request.username);
      throw new HttpException(
        'Usuário, e-mail ou código já cadastrado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // Hashing the password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(request.password, salt);
      
      const activationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      const newUsuario = this.usuarioRepository.create({
        ...request,
        password: hashedPassword,
        status: 'PENDING',
        activationToken,
      });

      const savedUsuario = await this.usuarioRepository.save(newUsuario);
      console.log('Usuário salvo com sucesso no banco:', savedUsuario.idUsuario);

      try {
        await this.mailService.sendUserConfirmation(savedUsuario, activationToken);
      } catch (mailError) {
        console.error('Falha ao enviar e-mail de confirmação:', mailError);
        // Note: we might want to continue even if email fails, or roll back. 
        // For now, we'll just log it.
      }
      
      const response = new UsuarioResponse(savedUsuario);
      return response;
    } catch (error) {
      console.error('ERRO CRÍTICO AO SALVAR NO BANCO:', error);
      throw new HttpException('Erro interno ao salvar no banco de dados', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
