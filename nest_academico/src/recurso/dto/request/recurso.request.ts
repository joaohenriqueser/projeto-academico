import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class RecursoRequest {
  @IsOptional()
  nomeRecurso: any;

}
