import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { RoleRequest } from '../dto/request/role.request';
import { RoleResponse } from '../dto/response/role.response';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class RoleServiceCreate {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(request: RoleRequest): Promise<RoleResponse> {
    const existing = await this.roleRepository.findOne({
      where: { nomeRole: request.nomeRole },
    });

    if (existing) {
      throw new HttpException(
        'Role já cadastrado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newRole = this.roleRepository.create(request);
    const saved = await this.roleRepository.save(newRole);

    return new RoleResponse(saved);
  }
}
