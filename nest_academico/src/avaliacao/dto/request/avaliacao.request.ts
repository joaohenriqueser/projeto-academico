import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class AvaliacaoRequest {
  @IsOptional()
  descricao: any;

  @IsOptional()
  disciplinaId: any;

}
