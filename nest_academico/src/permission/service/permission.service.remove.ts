import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { HttpException } from '@nestjs/common';

@Injectable()
export class PermissionServiceRemove {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async remove(id: number): Promise<boolean> {
    const permission = await this.permissionRepository.findOne({
      where: { idPermission: id },
    });

    if (!permission) {
      throw new HttpException('Permission não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.permissionRepository.remove(permission);
    return true;
  }
}
