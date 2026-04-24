import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { PermissionRequest } from '../dto/request/permission.request';
import { PermissionResponse } from '../dto/response/permission.response';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class PermissionServiceCreate {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(request: PermissionRequest): Promise<PermissionResponse> {
    const existing = await this.permissionRepository.findOne({
      where: { action: request.action },
    });

    if (existing) {
      throw new HttpException(
        'Permission já cadastrado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPermission = this.permissionRepository.create(request);
    const saved = await this.permissionRepository.save(newPermission);

    return new PermissionResponse(saved);
  }
}
