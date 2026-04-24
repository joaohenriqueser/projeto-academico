import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Professor } from '../entities/professor.entity';
import { ProfessorResponse } from '../dto/response/professor.response';
import { Pageable } from '../../commons/pagination/page.response';
import { Page } from '../../commons/pagination/page.sistema';
import { PROFESSOR, fieldsProfessor } from '../constants/professor.constants';

@Injectable()
export class ProfessorServiceList {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
  ) {}

  async list(
    page: number,
    pageSize: number,
    props: string,
    order: 'ASC' | 'DESC',
    search?: string,
  ): Promise<Page<ProfessorResponse>> {
    const pageable = new Pageable(page, pageSize, props, order, fieldsProfessor);

    const [lista, totalElements] = await this.professorRepository.findAndCount({
      where: search ? { nomeProfessor: Like(`%${search}%`) } : {},
      order: { [pageable.props]: order } as any,
      skip: pageable.offset,
      take: pageable.limit,
    });

    const responses = lista.map((p) => new ProfessorResponse(p));

    return Page.of(responses, totalElements, pageable);
  }
}
