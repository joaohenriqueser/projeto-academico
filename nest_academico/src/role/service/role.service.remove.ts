import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { HttpException } from '@nestjs/common';

@Injectable()
export class RoleServiceRemove {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async remove(id: number): Promise<boolean> {
    const role = await this.roleRepository.findOne({
      where: { idRole: id },
    });

    if (!role) {
      throw new HttpException('Role não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.roleRepository.remove(role);
    return true;
  }
}
