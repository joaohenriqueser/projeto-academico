import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recurso } from '../entities/recurso.entity';
import { RecursoResponse } from '../dto/response/recurso.response';
import { Pageable } from '../../commons/pagination/page.response';
import { Page } from '../../commons/pagination/page.sistema';
import { RECURSO, fieldsRecurso } from '../constants/recurso.constants';

@Injectable()
export class RecursoServiceList {
  constructor(
    @InjectRepository(Recurso)
    private readonly recursoRepository: Repository<Recurso>,
  ) {}

  async list(
    page: number,
    pageSize: number,
    props: string,
    order: 'ASC' | 'DESC',
    search?: string,
  ): Promise<Page<RecursoResponse>> {
    const pageable = new Pageable(page, pageSize, props, order, fieldsRecurso);

    const query = this.recursoRepository
      .createQueryBuilder(RECURSO.ALIAS)
      .orderBy(`${RECURSO.ALIAS}.${props}`, order)
      .offset(pageable.offset)
      .limit(pageable.limit);

    if (search) {
      query.where(`${RECURSO.ALIAS}.${props} LIKE :search_where`, {
        search_where: `%${search}%`,
      });
    }

    const [lista, totalElements] = await query.getManyAndCount();

    const responses = lista.map((p) => new RecursoResponse(p));

    return Page.of(responses, totalElements, pageable);
  }
}
