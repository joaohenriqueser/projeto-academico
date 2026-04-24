import { ApiProperty } from '@nestjs/swagger';

export class ProfessorResponse {
  @ApiProperty({ example: 1, description: 'ID do Professor' })
  idProfessor?: number;

  @ApiProperty({ example: 'PR001', description: 'Código do Professor' })
  codProfessor: string = '';

  @ApiProperty({ example: 'João Silva', description: 'Nome do Professor' })
  nomeProfessor: string = '';

  @ApiProperty({ example: 1, description: 'ID do Usuário' })
  idUsuario: number = 0;

  constructor(data: Partial<ProfessorResponse> = {}) {
    Object.assign(this, data);
  }
}
