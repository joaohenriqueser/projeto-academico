import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { PermissionResponse } from '../dto/response/permission.response';
import { HttpException } from '@nestjs/common';

@Injectable()
export class PermissionServiceFindOne {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async findOne(id: number): Promise<PermissionResponse> {
    const permission = await this.permissionRepository.findOne({
      where: { idPermission: id },
    });

    if (!permission) {
      throw new HttpException('Permission não encontrado.', HttpStatus.NOT_FOUND);
    }

    return new PermissionResponse(permission);
  }
}
