import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsuarioServiceFind } from '../../usuario/service/usuario.service.find';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usuarioService: UsuarioServiceFind,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: any) {
    const user = await this.usuarioService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    // Check if email is verified if required
    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Email not verified or account inactive');
    }
    return user;
  }
}
