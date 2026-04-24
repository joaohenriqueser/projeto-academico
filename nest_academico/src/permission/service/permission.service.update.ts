import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { PermissionRequest } from '../dto/request/permission.request';
import { PermissionResponse } from '../dto/response/permission.response';
import { HttpException } from '@nestjs/common';

@Injectable()
export class PermissionServiceUpdate {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async update(id: number, request: PermissionRequest): Promise<PermissionResponse> {
    const permission = await this.permissionRepository.findOne({
      where: { idPermission: id },
    });

    if (!permission) {
      throw new HttpException('Permission não encontrado.', HttpStatus.NOT_FOUND);
    }

    Object.assign(permission, request);
    const updated = await this.permissionRepository.save(permission);

    return new PermissionResponse(updated);
  }
}
