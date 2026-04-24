import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Disciplina } from '../entities/disciplina.entity';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { Pageable } from '../../commons/pagination/page.response';
import { Page } from '../../commons/pagination/page.sistema';
import { DISCIPLINA, fieldsDisciplina } from '../constants/disciplina.constants';

@Injectable()
export class DisciplinaServiceList {
  constructor(
    @InjectRepository(Disciplina)
    private readonly disciplinaRepository: Repository<Disciplina>,
  ) {}

  async list(
    page: number,
    pageSize: number,
    props: string,
    order: 'ASC' | 'DESC',
    search?: string,
  ): Promise<Page<DisciplinaResponse>> {
    const pageable = new Pageable(page, pageSize, props, order, fieldsDisciplina);

    const [lista, totalElements] = await this.disciplinaRepository.findAndCount({
      where: search ? { nomeDisciplina: Like(`%${search}%`) } : {},
      order: { [pageable.props]: order } as any,
      skip: pageable.offset,
      take: pageable.limit,
    });

    const responses = lista.map((p) => new DisciplinaResponse(p));

    return Page.of(responses, totalElements, pageable);
  }
}
