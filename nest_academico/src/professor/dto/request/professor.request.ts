import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class ProfessorRequest {
  @ApiProperty({ example: 'PR001', description: 'Código do Professor' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  codProfessor: string = '';

  @ApiProperty({ example: 'João Silva', description: 'Nome do Professor' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nomeProfessor: string = '';

  @ApiProperty({ example: 1, description: 'ID do Usuário associado' })
  @IsNumber()
  @IsNotEmpty()
  idUsuario: number = 0;
}
