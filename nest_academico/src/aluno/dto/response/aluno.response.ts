import { ApiProperty } from '@nestjs/swagger';

export class AlunoResponse {
  @ApiProperty({ example: 1, description: 'ID do Aluno' })
  idAluno?: number;

  @ApiProperty({ example: 'AL001', description: 'Código do Aluno' })
  codAluno: string = '';

  @ApiProperty({ example: 'Maria Silva', description: 'Nome do Aluno' })
  nomeAluno: string = '';

  @ApiProperty({ example: 20, description: 'Idade do Aluno' })
  idade?: number;

  @ApiProperty({ example: 2, description: 'ID do Usuário associado' })
  idUsuario: number = 0;

  constructor(data: Partial<AlunoResponse> = {}) {
    Object.assign(this, data);
  }
}
