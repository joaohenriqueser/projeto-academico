import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsuarioServiceFind } from '../usuario/service/usuario.service.find';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { MoreThan } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioServiceFind,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usuarioService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      if (user.status !== 'ACTIVE') {
        throw new UnauthorizedException('Email não verificado. Verifique sua caixa de entrada.');
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.idUsuario };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.idUsuario,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usuarioService.findByEmail(email);
    if (!user) {
      // For security, don't reveal if user exists
      return { message: 'Se o e-mail existir, um link de recuperação será enviado.' };
    }

    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    user.recoveryToken = token;
    user.tokenExpires = new Date(Date.now() + 3600000); // 1 hour TTL
    await this.usuarioService.save(user);

    await this.mailService.sendForgotPassword(user, token);

    return { message: 'E-mail de recuperação enviado com sucesso.' };
  }

  async resetPassword(token: string, newPass: string) {
    const user = await this.usuarioService.findByRecoveryToken(token);
    
    if (!user || !user.tokenExpires || user.tokenExpires < new Date()) {
      throw new BadRequestException('Token inválido ou expirado.');
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPass, salt);
    user.recoveryToken = undefined;
    user.tokenExpires = undefined;
    
    await this.usuarioService.save(user);

    return { message: 'Senha alterada com sucesso.' };
  }

  async verifyEmail(token: string) {
    const user = await this.usuarioService.findByActivationToken(token);

    if (!user) {
      throw new BadRequestException('Token de ativação inválido.');
    }

    user.status = 'ACTIVE';
    user.activationToken = undefined;
    
    await this.usuarioService.save(user);

    return { message: 'E-mail verificado com sucesso! Você já pode fazer login.' };
  }
}
