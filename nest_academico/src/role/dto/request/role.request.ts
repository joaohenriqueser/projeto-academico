import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class RoleRequest {
  @IsOptional()
  nomeRole: any;

}
