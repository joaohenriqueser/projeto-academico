import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'usuario@exemplo.com' })
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email!: string;

  @ApiProperty({ example: 'senha123' })
  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password!: string;
}

export class ForgotPasswordRequest {
  @ApiProperty({ example: 'usuario@exemplo.com' })
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email!: string;
}

export class ResetPasswordRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O token é obrigatório' })
  token!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'A nova senha é obrigatória' })
  @MinLength(6, { message: 'A nova senha deve ter pelo menos 6 caracteres' })
  password!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'A confirmação de senha é obrigatória' })
  confirmPassword!: string;
}

// Keep aliases for backward compatibility if any references exist
export { ForgotPasswordRequest as ForgotPasswordDto };
export { ResetPasswordRequest as ResetPasswordDto };

