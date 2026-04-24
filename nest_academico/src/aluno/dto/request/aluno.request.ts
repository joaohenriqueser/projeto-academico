import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class AlunoRequest {
  @ApiProperty({ example: 'AL001', description: 'Código do Aluno' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  codAluno: string = '';

  @ApiProperty({ example: 'Maria Silva', description: 'Nome do Aluno' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nomeAluno: string = '';

  @ApiPropertyOptional({ example: 20, description: 'Idade do Aluno' })
  @IsNumber()
  @IsOptional()
  idade?: number;

  @ApiProperty({ example: 2, description: 'ID do Usuário associado' })
  @IsNumber()
  @IsNotEmpty()
  idUsuario: number = 0;
}
