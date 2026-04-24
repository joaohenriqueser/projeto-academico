import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { RoleRequest } from '../dto/request/role.request';
import { RoleResponse } from '../dto/response/role.response';
import { HttpException } from '@nestjs/common';

@Injectable()
export class RoleServiceUpdate {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async update(id: number, request: RoleRequest): Promise<RoleResponse> {
    const role = await this.roleRepository.findOne({
      where: { idRole: id },
    });

    if (!role) {
      throw new HttpException('Role não encontrado.', HttpStatus.NOT_FOUND);
    }

    Object.assign(role, request);
    const updated = await this.roleRepository.save(role);

    return new RoleResponse(updated);
  }
}
