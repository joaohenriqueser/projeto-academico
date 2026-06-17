import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsuarioServiceFind } from '../usuario/service/usuario.service.find';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { MoreThan } from 'typeorm';
import * as crypto from 'crypto';


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
      // For security, return same message so user existence is not leaked
      return { message: 'Se o e-mail informado estiver cadastrado, um link de redefinição de senha será enviado.' };
    }

    // Generate secure random token (64 hex characters)
    const token = crypto.randomBytes(32).toString('hex');
    
    // Hash the token to save in database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    user.recoveryToken = hashedToken;
    user.tokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes validity
    user.usedAt = undefined; // reset if previously used
    await this.usuarioService.save(user);

    // Send email with plaintext token
    await this.mailService.sendForgotPassword(user, token);

    return { message: 'Se o e-mail informado estiver cadastrado, um link de redefinição de senha será enviado.' };
  }

  async resetPassword(token: string, newPass: string, confirmPass: string) {
    if (newPass !== confirmPass) {
      throw new BadRequestException('A senha e a confirmação de senha não coincidem.');
    }

    // Hash the received token to query database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await this.usuarioService.findByRecoveryToken(hashedToken);
    
    if (!user) {
      throw new BadRequestException('Token de recuperação inválido.');
    }

    if (user.usedAt) {
      throw new BadRequestException('Este token de recuperação já foi utilizado.');
    }

    if (!user.tokenExpires || user.tokenExpires < new Date()) {
      throw new BadRequestException('Este token de recuperação expirou.');
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPass, salt);
    user.usedAt = new Date(); // Invalidate token by marking usedAt
    
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
