import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { RoleResponse } from '../dto/response/role.response';
import { HttpException } from '@nestjs/common';

@Injectable()
export class RoleServiceFindOne {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findOne(id: number): Promise<RoleResponse> {
    const role = await this.roleRepository.findOne({
      where: { idRole: id },
    });

    if (!role) {
      throw new HttpException('Role não encontrado.', HttpStatus.NOT_FOUND);
    }

    return new RoleResponse(role);
  }
}
