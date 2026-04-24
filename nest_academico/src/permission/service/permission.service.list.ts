import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { PermissionResponse } from '../dto/response/permission.response';
import { Pageable } from '../../commons/pagination/page.response';
import { Page } from '../../commons/pagination/page.sistema';
import { PERMISSION, fieldsPermission } from '../constants/permission.constants';

@Injectable()
export class PermissionServiceList {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async list(
    page: number,
    pageSize: number,
    props: string,
    order: 'ASC' | 'DESC',
    search?: string,
  ): Promise<Page<PermissionResponse>> {
    const pageable = new Pageable(page, pageSize, props, order, fieldsPermission);

    const query = this.permissionRepository
      .createQueryBuilder(PERMISSION.ALIAS)
      .orderBy(`${PERMISSION.ALIAS}.${props}`, order)
      .offset(pageable.offset)
      .limit(pageable.limit);

    if (search) {
      query.where(`${PERMISSION.ALIAS}.${props} LIKE :search_where`, {
        search_where: `%${search}%`,
      });
    }

    const [lista, totalElements] = await query.getManyAndCount();

    const responses = lista.map((p) => new PermissionResponse(p));

    return Page.of(responses, totalElements, pageable);
  }
}
