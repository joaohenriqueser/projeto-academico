import { Controller, Post, Body, Get, Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginDto, ForgotPasswordRequest, ResetPasswordRequest } from './dto/auth.dto';

@ApiTags('autenticacao')
@Controller('rest/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realiza login e retorna token JWT' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return this.authService.login(user);
  }

  @Get('verify')
  @ApiOperation({ summary: 'Verifica o e-mail do usuário via token' })
  async verify(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Solicita recuperação de senha' })
  async forgotPassword(@Body() forgotPasswordRequest: ForgotPasswordRequest) {
    return this.authService.forgotPassword(forgotPasswordRequest.email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Redefine a senha via token' })
  async resetPassword(@Body() resetPasswordRequest: ResetPasswordRequest) {
    return this.authService.resetPassword(
      resetPasswordRequest.token,
      resetPasswordRequest.password,
      resetPasswordRequest.confirmPassword,
    );
  }

}
