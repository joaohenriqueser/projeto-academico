import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: Usuario, token: string) {
    const url = `http://localhost:3000/auth/verify?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Bem-vindo ao Nest Acadêmico! Confirme seu e-mail',
      template: './confirmation',
      context: {
        name: user.firstName,
        url,
      },
    });
  }

  async sendForgotPassword(user: Usuario, token: string) {
    const url = `http://localhost:3000/auth/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Recuperação de Senha - Nest Acadêmico',
      template: './forgot-password',
      context: {
        name: user.firstName,
        url,
      },
    });
  }
}
