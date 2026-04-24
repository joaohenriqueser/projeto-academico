import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UsuarioRequest {
  @IsString()
  @IsOptional()
  codUsuario?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string = '';

  @IsString()
  @IsNotEmpty()
  lastName: string = '';

  @IsString()
  @IsNotEmpty()
  username: string = '';

  @IsString()
  @IsNotEmpty()
  password: string = '';

  @IsEmail()
  @IsOptional()
  email?: string;
}
