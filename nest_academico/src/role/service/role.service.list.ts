import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { RoleResponse } from '../dto/response/role.response';
import { Pageable } from '../../commons/pagination/page.response';
import { Page } from '../../commons/pagination/page.sistema';
import { ROLE, fieldsRole } from '../constants/role.constants';

@Injectable()
export class RoleServiceList {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async list(
    page: number,
    pageSize: number,
    props: string,
    order: 'ASC' | 'DESC',
    search?: string,
  ): Promise<Page<RoleResponse>> {
    const pageable = new Pageable(page, pageSize, props, order, fieldsRole);

    const query = this.roleRepository
      .createQueryBuilder(ROLE.ALIAS)
      .orderBy(`${ROLE.ALIAS}.${props}`, order)
      .offset(pageable.offset)
      .limit(pageable.limit);

    if (search) {
      query.where(`${ROLE.ALIAS}.${props} LIKE :search_where`, {
        search_where: `%${search}%`,
      });
    }

    const [lista, totalElements] = await query.getManyAndCount();

    const responses = lista.map((p) => new RoleResponse(p));

    return Page.of(responses, totalElements, pageable);
  }
}
