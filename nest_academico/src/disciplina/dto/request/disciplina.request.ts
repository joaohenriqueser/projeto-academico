import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class DisciplinaRequest {
  @IsOptional()
  periodo: any;

  @IsOptional()
  nomeDisciplina: any;

  @IsOptional()
  idProfessor: any;

}
