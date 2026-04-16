import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UsuarioRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password!: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  confirmPassword!: string;
}
