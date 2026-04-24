import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class PermissionRequest {
  @IsOptional()
  roleId: any;

  @IsOptional()
  recursoId: any;

  @IsOptional()
  action: any;

  @IsOptional()
  possession: any;

  @IsOptional()
  attributes: any;

}
