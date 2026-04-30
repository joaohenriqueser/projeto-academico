import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsuarioServiceFind } from '../usuario/service/usuario.service.find';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioServiceFind,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usuarioService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // Retornando um token dummy já que o professor ensinará JWT depois
    return {
      access_token: 'dummy-token-placeholder',
      user: {
        id: user.idUsuario,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    };
  }

  async forgotPassword(email: string) {
    return { message: 'Fluxo de recuperação desabilitado temporariamente.' };
  }

  async resetPassword(token: string, newPass: string) {
    return { message: 'Fluxo de recuperação desabilitado temporariamente.' };
  }

  async verifyEmail(token: string) {
    return { message: 'Fluxo de verificação desabilitado temporariamente.' };
  }
}
